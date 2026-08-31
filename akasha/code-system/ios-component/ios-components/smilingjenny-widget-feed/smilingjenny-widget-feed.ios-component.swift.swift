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
    private static func key(for endpoint: URL) -> String {
        "last-known" + endpoint.path
    }

    static func write(_ body: Data, for endpoint: URL) {
        UserDefaults.standard.set(body, forKey: key(for: endpoint))
    }

    static func read(for endpoint: URL) -> Data? {
        UserDefaults.standard.data(forKey: key(for: endpoint))
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
            let entry = Entry(date: now, state: await currentState())
            let next = Calendar.current.date(byAdding: .minute, value: 15, to: now)
                ?? now.addingTimeInterval(900)
            completion(Timeline(entries: [entry], policy: .after(next)))
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
