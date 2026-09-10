import Foundation
import SwiftUI
import WidgetKit

enum FeedState<Payload> {
    case loaded(Payload)
    case neverLoaded
    case refused
}

struct FeedEntry<Payload>: TimelineEntry {
    let date: Date
    let state: FeedState<Payload>
}

protocol WidgetFeed {
    associatedtype Payload: Decodable
    static var endpoint: URL { get }
    static var previewPayload: Payload { get }

    // A FEED WHOSE TILE CHANGES ON ITS OWN SAYS WHEN, AND EVERY OTHER FEED SAYS NOTHING.
    static func turns(_ payload: Payload, after now: Date) -> Date?
}

extension WidgetFeed {
    static func turns(_ payload: Payload, after now: Date) -> Date? { nil }
}

enum RingCredential {
    static let header = "X-Ring-Credential"

    static let baked = "__RING_CREDENTIAL_NOT_SUBSTITUTED__"

    static func toPresent(_ value: String = baked) -> String? {
        if value.isEmpty || value.hasPrefix(placeholderPrefix) { return nil }
        return value
    }

    private static let placeholderPrefix = "__RING_CREDENTIAL"
}

enum LastKnownStore {
    static let HELD_FOR: TimeInterval = 45 * 60

    private static func key(for endpoint: URL) -> String {
        "last-known" + endpoint.path
    }

    private static func takenKey(for endpoint: URL) -> String {
        "last-known-taken-at" + endpoint.path
    }

    static func stillHeld(takenAt taken: TimeInterval, now: Date) -> Bool {
        guard taken > 0 else { return false }
        let age = now.timeIntervalSince1970 - taken
        return age >= 0 && age < HELD_FOR
    }

    static func write(_ body: Data, for endpoint: URL, at moment: Date = Date()) {
        UserDefaults.standard.set(body, forKey: key(for: endpoint))
        UserDefaults.standard.set(moment.timeIntervalSince1970, forKey: takenKey(for: endpoint))
    }

    static func read(for endpoint: URL, now: Date = Date()) -> Data? {
        let defaults = UserDefaults.standard
        guard let body = defaults.data(forKey: key(for: endpoint)) else { return nil }
        guard stillHeld(takenAt: defaults.double(forKey: takenKey(for: endpoint)), now: now)
        else { return nil }
        return body
    }
}

enum FetchOutcome {
    case body(Data)
    case refused
    case unreachable

    static func forStatus(_ statusCode: Int, body: Data) -> FetchOutcome {
        if statusCode == 401 { return .refused }
        guard statusCode == 200 else { return .unreachable }
        return .body(body)
    }
}

enum FeedResolution {
    struct Resolution<Payload> {
        let state: FeedState<Payload>
        let cacheWrite: Data?
    }

    static func resolve<Payload>(
        outcome: FetchOutcome, cached: Data?, decode: (Data) -> Payload?
    ) -> Resolution<Payload> {
        switch outcome {
        case .refused:
            return Resolution(state: .refused, cacheWrite: nil)
        case .body(let body):
            if let payload = decode(body) {
                return Resolution(state: .loaded(payload), cacheWrite: body)
            }
            return fromCache(cached, decode)
        case .unreachable:
            return fromCache(cached, decode)
        }
    }

    private static func fromCache<Payload>(
        _ cached: Data?, _ decode: (Data) -> Payload?
    ) -> Resolution<Payload> {
        if let body = cached, let payload = decode(body) {
            return Resolution(state: .loaded(payload), cacheWrite: nil)
        }
        return Resolution(state: .neverLoaded, cacheWrite: nil)
    }
}

// A TILE THAT WILL CHANGE ON ITS OWN IS SHOWN A SECOND TIME AT THE MOMENT IT CHANGES.
//
// The cost tile counts down to the moment the surplus reaches the rung beneath it. That is
// the moment its color moves and its countdown has to re-aim, and nothing on the phone runs
// a tile's body between timeline entries. `Text(_:style: .relative)` ticks its own text, but
// the date handed to it was settled when the body last ran, so a timeline holding one entry
// shows the change up to fifteen minutes late and counts upward until it catches up.
//
// The second entry is the same payload at a later date. It fetches nothing and it is not a
// refresh. It is there so the arithmetic every ring already does against `entry.date` is
// done again at the instant the answer changes: the figure will have fallen further and the
// tier may have moved, which is the whole point of the entry rather than a cost of it.
//
// The refresh moment stays fifteen minutes out even when the turn is nearer. A refresh asks
// the server whether the reading changed, and a rung reached says nothing about that, since
// the moment it is reached was worked out from the reading already in hand. Aiming the
// refresh there would spend the reload budget the fifteen-minute cadence already
// oversubscribes on an answer this entry gives for nothing, and a fast rate reaches rungs
// minutes apart, so it would spend several in a row and leave none for the rest of the day.
// `dates` is handed no refresh moment at all, so there is nothing in it to confuse the two.
enum FeedTimeline {
    static func dates(now: Date, turning: Date?) -> [Date] {
        guard let turning, turning > now else { return [now] }
        return [now, turning]
    }

    static func turning<Feed: WidgetFeed>(
        _ feed: Feed.Type, _ state: FeedState<Feed.Payload>, _ now: Date
    ) -> Date? {
        guard case .loaded(let payload) = state else { return nil }
        return Feed.turns(payload, after: now)
    }
}

struct FeedProvider<Feed: WidgetFeed>: TimelineProvider {
    typealias Entry = FeedEntry<Feed.Payload>

    func placeholder(in context: TimelineProviderContext) -> Entry {
        Entry(date: Date(), state: .loaded(Feed.previewPayload))
    }

    func getSnapshot(in context: TimelineProviderContext, completion: @escaping (Entry) -> Void) {
        if context.isPreview {
            completion(Entry(date: Date(), state: .loaded(Feed.previewPayload)))
            return
        }
        Task { completion(Entry(date: Date(), state: await currentState())) }
    }

    func getTimeline(in context: TimelineProviderContext, completion: @escaping (Timeline<Entry>) -> Void) {
        Task {
            let now = Date()
            let state = await currentState()
            let next = Calendar.current.date(byAdding: .minute, value: 15, to: now)
                ?? now.addingTimeInterval(900)
            let dates = FeedTimeline.dates(
                now: now, turning: FeedTimeline.turning(Feed.self, state, now))
            let entries = dates.map { Entry(date: $0, state: state) }
            completion(Timeline(entries: entries, policy: .after(next)))
        }
    }

    private func currentState() async -> FeedState<Feed.Payload> {
        let resolution = FeedResolution.resolve(
            outcome: await fetchOutcome(),
            cached: LastKnownStore.read(for: Feed.endpoint),
            decode: decode)
        if let body = resolution.cacheWrite {
            LastKnownStore.write(body, for: Feed.endpoint)
        }
        return resolution.state
    }

    private func decode(_ body: Data) -> Feed.Payload? {
        try? JSONDecoder().decode(Feed.Payload.self, from: body)
    }

    private func fetchOutcome() async -> FetchOutcome {
        guard let credential = RingCredential.toPresent() else { return .refused }
        do {
            var request = URLRequest(url: Feed.endpoint)
            request.cachePolicy = .reloadIgnoringLocalCacheData
            request.timeoutInterval = 15
            request.setValue(credential, forHTTPHeaderField: RingCredential.header)
            let (data, response) = try await URLSession.shared.data(for: request)
            guard let http = response as? HTTPURLResponse else { return .unreachable }
            return FetchOutcome.forStatus(http.statusCode, body: data)
        } catch {
            return .unreachable
        }
    }
}
