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
