#!/usr/bin/env bash

cat >> "$APPDELEGATE" <<'SWIFT_HEALTH_SAMPLES'
    /// One HealthKit sample in the route's wire shape. The body parser is `.strict()`, so these
    /// six keys are exactly the whole of what may be sent — one extra key is a 400 for the whole
    /// batch, not for the offending sample.
    private struct WireSample: Encodable {
        let metric: String
        let startedAt: String
        let endedAt: String
        let value: Double
        let unit: String
        let sourceName: String
    }

    private static func wire(_ sample: HKQuantitySample, as metric: Metric) -> WireSample {
        WireSample(
            metric: metric.wireName,
            startedAt: instant(sample.startDate),
            endedAt: instant(sample.endDate),
            value: sample.quantity.doubleValue(for: metric.unit),
            unit: metric.wireUnit,
            // Kept as reported rather than normalized: a phone and a watch both record steps
            // over the same window under different source names, and both readings are wanted.
            // It is also part of the identity the server derives, so rewriting it here would
            // forge a second row for a sample that already landed.
            sourceName: sample.sourceRevision.source.name
        )
    }

    /// ISO-8601 in UTC, truncated to a WHOLE SECOND — and the truncation is load-bearing rather
    /// than tidiness.
    ///
    /// The server derives a sample's identity from its metric, its source and its two instants,
    /// with no UUID anywhere, because an exported health archive carries none. The OTHER sender
    /// into that same table reads exactly such an archive, and its instants are whole-second
    /// with a signed offset and no fractional part at all. A HealthKit date can carry a
    /// fraction. So if this side sent one, the very same sample would land TWICE — once down
    /// each path — and only once both senders were live, which is far too late to notice
    /// cheaply. The phone is therefore the side that gives ground.
    ///
    /// The second is taken here, explicitly, rather than left to the formatter: whether
    /// ISO8601DateFormatter truncates or rounds is not something this should depend on.
    private static func instant(_ date: Date) -> String {
        instantFormatter.string(
            from: Date(timeIntervalSince1970: floor(date.timeIntervalSince1970)))
    }

    private static let instantFormatter: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        // No fractional-seconds option and UTC, so this emits `2026-08-07T18:04:05Z`. The route
        // takes an offset or a `Z` and compares instants rather than text.
        formatter.formatOptions = [.withInternetDateTime]
        formatter.timeZone = TimeZone(secondsFromGMT: 0)
        return formatter
    }()

    /// The error route's body. Its parser is `.strict()`, so these seven keys are exactly the
    /// whole of what may be sent, and `errorUserId` has to be PRESENT AND NULL rather than left
    /// out — the shape has it required and nullable. Swift's synthesised encoder writes a nil
    /// optional by omitting the key, which that shape refuses, so the encoding is written out.
    private struct WireErrorReport: Encodable {
        let message: String
        let stack: String
        let kind: String
        let app: String
        let url: String
        let userAgent: String
        let errorUserId: String?

        private enum CodingKeys: String, CodingKey {
            case message, stack, kind, app, url, userAgent, errorUserId
        }

        func encode(to encoder: Encoder) throws {
            var container = encoder.container(keyedBy: CodingKeys.self)
            try container.encode(message, forKey: .message)
            try container.encode(stack, forKey: .stack)
            try container.encode(kind, forKey: .kind)
            try container.encode(app, forKey: .app)
            try container.encode(url, forKey: .url)
            try container.encode(userAgent, forKey: .userAgent)
            try container.encode(errorUserId, forKey: .errorUserId)
        }
    }

    /// A run's outcome told to akasha as well as to the lock screen.
    ///
    /// The notice `announce` posts is readable by Alan holding his phone and by nothing else,
    /// which is the whole of why #17551 cost six days: from every other side, a run that fired
    /// and failed and a run that never fired are one reading. This sends the same sentence
    /// somewhere a query can reach, so a silence can finally be told from a report of failure.
    ///
    /// EVERY RUN REPORTS, for the same reason `announce` posts on every run. A run that worked
    /// and found nothing new to send leaves no arrival either, so success is not self-evidencing
    /// and cannot be the case that goes untold.
    ///
    /// THE ROUTE TAKES NO CREDENTIAL, and that is why this one is used rather than a route of its
    /// own. The branch most worth hearing from is the one where the Keychain hands back nothing —
    /// a run that cannot authenticate to send a single sample can still be heard here. The cost
    /// is that a run that worked lands in a store named for errors; `url` names the intent, so
    /// they part on sight, and there are at most a handful of these a day.
    ///
    /// A REPORT THE ROUTE COULD NOT TAKE IS KEPT RATHER THAN DROPPED, and 2026-09-11 is why.
    /// The first run of the foreground seam fell inside an eight-minute window where the page
    /// store behind this route was down; everything that reached the route in it was refused and
    /// forgotten, and what that run did is now unknowable. A kept report is sent again by the
    /// next run, so an outage delays the news rather than destroying it.
    ///
    /// A KEPT REPORT CARRIES THE INSTANT IT WAS KEPT, because the store stamps a row with the
    /// hour the row arrived, and a report arriving a day late would otherwise say the run
    /// happened then.
    ///
    /// The newest twenty are kept and the rest fall away. This is a diary rather than a queue
    /// anything depends on, and a phone that cannot reach home for a month must not fill its own
    /// defaults with the news that it could not.
    ///
    /// Nothing of the answer is read but whether it arrived. This is called once the run has
    /// already decided what it did, and a report that could not be delivered must not change
    /// what Alan is told.
    ///
    /// A SHORTER TIMEOUT THAN `post`'s. A headless run has a small budget of wall time and the
    /// samples are what it is for; a report that cannot get out fast must not be what spends it.
    ///
    /// NOT PRIVATE, because the foreground seam says a run began before that run reads a thing,
    /// and it is outside this type.
    static func report(_ outcome: String) async {
        await flushKeptReports()
        if await send(outcome) { return }
        keep("\(instant(Date())) \(outcome)")
    }

    /// Sends one sentence and says whether the route took it. Only a 2xx is an arrival: the route
    /// answers 204 where the report was filed and 500 where the store behind it refused the
    /// write, and that second answer is exactly the case worth keeping.
    private static func send(_ outcome: String) async -> Bool {
        var request = URLRequest(url: errorEndpoint)
        request.httpMethod = "POST"
        request.timeoutInterval = 10
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        // Which build spoke. `releaseSha` would be the shapelier home for it, but the stamp this
        // app carries is a commit written by the deploy, and a TestFlight build number is what
        // Alan reads off his phone, so the number goes where a client names itself.
        let build = Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "unknown"
        guard
            let body = try? JSONEncoder().encode(
                WireErrorReport(
                    message: outcome,
                    stack: "",
                    kind: "error",
                    app: "alanwalton-native",
                    url: "stream-health-samples",
                    userAgent: "StreamHealthSamplesIntent/\(build)",
                    errorUserId: nil))
        else { return false }
        request.httpBody = body
        guard let (_, response) = try? await URLSession.shared.data(for: request),
            let http = response as? HTTPURLResponse
        else { return false }
        return (200..<300).contains(http.statusCode)
    }

    /// Sends what earlier runs could not, oldest first, and keeps back whatever still will not
    /// go. Called before the fresh report so the store reads in the order things happened.
    private static func flushKeptReports() async {
        let defaults = UserDefaults.standard
        let kept = defaults.stringArray(forKey: keptReportsKey) ?? []
        guard !kept.isEmpty else { return }
        var left: [String] = []
        for one in kept {
            if await send(one) { continue }
            left.append(one)
        }
        defaults.set(left, forKey: keptReportsKey)
    }

    private static func keep(_ line: String) {
        let defaults = UserDefaults.standard
        var kept = defaults.stringArray(forKey: keptReportsKey) ?? []
        kept.append(line)
        defaults.set(Array(kept.suffix(keptReportsKeptAtMost)), forKey: keptReportsKey)
    }

    private static let keptReportsKey = "healthSamples.keptReports"
    private static let keptReportsKeptAtMost = 20

    private enum PostOutcome {
        case success(IngestResponse)
        case failure(String)
    }

    private struct IngestBody: Encodable {
        let samples: [WireSample]
    }

    /// The route reports more than this; only what a line here can act on is decoded, and an
    /// unknown key is ignored rather than fatal.
    private struct IngestResponse: Decodable {
        let ok: Bool
        let received: Int
        let inserted: Int
        let valueChanged: Int
    }

    private static func post(secret: String, samples: [WireSample]) async -> PostOutcome {
        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        request.timeoutInterval = 30
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue(secret, forHTTPHeaderField: "X-Device-Secret")
        guard let body = try? JSONEncoder().encode(IngestBody(samples: samples)) else {
            return .failure("a batch of \(samples.count) could not be encoded.")
        }
        request.httpBody = body

        guard let (data, response) = try? await URLSession.shared.data(for: request),
            let http = response as? HTTPURLResponse
        else {
            return .failure("alanwalton.com could not be reached.")
        }
        guard http.statusCode == 200 else {
            let detail = String(data: data, encoding: .utf8).map { $0.prefix(120) } ?? ""
            return .failure("a batch was refused (HTTP \(http.statusCode)). \(detail)")
        }
        guard let decoded = try? JSONDecoder().decode(IngestResponse.self, from: data), decoded.ok
        else {
            return .failure("a batch got an unexpected response, so treat it as not sent.")
        }
        return .success(decoded)
    }

SWIFT_HEALTH_SAMPLES
