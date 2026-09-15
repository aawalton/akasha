import AppIntents
import SwiftUI
import WidgetKit

// WHICH TILE ASKS FOR A FEED, SO A FEED CAN BE SET BESIDE THE TILES THE PHONE SAYS ARE UP.
//
// WidgetKit names the tiles a person has placed by kind, and a reading is held under the path
// it was fetched from, so the two cannot be set beside each other without a table between
// them. A provider holds both at once every time it runs, so that is where the pairing is
// written down.
enum FeedKinds {
    static let KEY = "feed-kinds"

    static func pair(kind: String, path: String) {
        var table = UserDefaults.standard.dictionary(forKey: KEY) as? [String: String] ?? [:]
        guard table[kind] != path else { return }
        table[kind] = path
        UserDefaults.standard.set(table, forKey: KEY)
    }

    static func table() -> [String: String] {
        UserDefaults.standard.dictionary(forKey: KEY) as? [String: String] ?? [:]
    }

    static func asking(placed: [String], table: [String: String]) -> Set<String> {
        Set(placed.compactMap { table[$0] })
    }
}

// THE OLDEST READING ANY TILE IS DRAWING, WHICH IS THE ONE AGE WORTH A GLANCE.
//
// A tile writes the moment its own reading was taken, and writes it only where that reading
// decoded. A refresh that fails leaves the moment where it was, so an age still climbing is a
// refresh that did not land rather than one that was never asked for. That is what makes this
// worth trusting: the age and the reading fail apart.
//
// The oldest of them is what the tile draws, because a screen is only as current as its
// stalest tile and a reader should not have to check them one at a time.
enum Freshness {
    static let TAKEN_PREFIX = "last-known-taken-at"

    static func stalest(_ taken: [String: Date]) -> (path: String, at: Date)? {
        let oldest = taken.min {
            $0.value == $1.value ? $0.key < $1.key : $0.value < $1.value
        }
        return oldest.map { (path: $0.key, at: $0.value) }
    }

    // THE LAST PART OF A FEED'S PATH IS ALL A TILE THIS SIZE HAS ROOM TO NAME IT BY.
    static func naming(_ path: String) -> String {
        String(path.split(separator: "/").last ?? "")
    }

    static func taken(_ stored: [String: Any]) -> [String: Date] {
        var taken: [String: Date] = [:]
        for (key, held) in stored where key.hasPrefix(TAKEN_PREFIX) {
            guard let seconds = held as? Double, seconds > 0 else { continue }
            taken[String(key.dropFirst(TAKEN_PREFIX.count))] = Date(timeIntervalSince1970: seconds)
        }
        return taken
    }

    static func nowTaken() -> [String: Date] {
        taken(UserDefaults.standard.dictionaryRepresentation())
    }
}

struct FreshnessEntry: TimelineEntry {
    let date: Date
    let stalest: Date?
    let stalestName: String?
    let tiles: Int
}

// A HARNESS DRAWS THIS TILE FROM A BODY, SINCE THE STORE IT READS IS THE PHONE'S OWN.
struct FreshnessReadout: Decodable {
    let stalestSecondsAgo: Double?
    let stalestName: String?
    let tiles: Int
}

enum FreshnessReading {
    static let OWN_PATH = "/freshness"
    static let OWN_KIND = "FreshnessWidget"

    // A FEED IS THE APP'S WHILE A TILE OF THE APP IS PLACED FOR IT, AND NOT A MOMENT LONGER.
    //
    // A moment written for a feed stays written after the tile that wanted it is taken off the
    // phone, because iOS goes on asking a tile that is gone for a picture and each of those
    // fetches is real. So a fresh reading does not say a tile is up, and a feed nobody was
    // looking at became the answer. What says a tile is up is the list of kinds WidgetKit
    // answers with, read every time this tile is worked out and turned into feeds through the
    // table.
    static func reading(
        taken: [String: Date], asking: Set<String>, now: Date
    ) -> FreshnessEntry {
        let asked = taken.filter { asking.contains($0.key) }
        let oldest = Freshness.stalest(asked)
        return FreshnessEntry(
            date: now, stalest: oldest?.at, stalestName: oldest.map { Freshness.naming($0.path) },
            tiles: asked.count)
    }

    static func made(_ readout: FreshnessReadout, at now: Date) -> FreshnessEntry {
        FreshnessEntry(
            date: now, stalest: readout.stalestSecondsAgo.map { now.addingTimeInterval(-$0) },
            stalestName: readout.stalestName, tiles: readout.tiles)
    }
}

// THE WHOLE TILE IS THE BUTTON, SO NO CORNER IS TAKEN FROM WHAT THE TILE SAYS.
//
// An app intent a tile runs is not counted against any tile's grant, and WidgetKit reloads the
// tile that ran it whether or not the intent asks. Asking every tile is what this is for.
struct RefreshEveryTile: AppIntent {
    static var title: LocalizedStringResource = "Refresh every tile"
    static var description = IntentDescription("Ask every tile of this app for a new reading.")

    func perform() async throws -> some IntentResult {
        WidgetCenter.shared.reloadAllTimelines()
        return .result()
    }
}

struct FreshnessProvider: TimelineProvider {
    func placeholder(in context: TimelineProviderContext) -> FreshnessEntry {
        FreshnessEntry(
            date: Date(), stalest: Date().addingTimeInterval(-420),
            stalestName: "claude-usage", tiles: 8)
    }

    func getSnapshot(
        in context: TimelineProviderContext, completion: @escaping (FreshnessEntry) -> Void
    ) {
        if context.isPreview {
            completion(placeholder(in: context))
            return
        }
        asking { completion(made(at: Date(), asking: $0)) }
    }

    func getTimeline(
        in context: TimelineProviderContext, completion: @escaping (Timeline<FreshnessEntry>) -> Void
    ) {
        let now = Date()
        FeedKinds.pair(kind: FreshnessReading.OWN_KIND, path: FreshnessReading.OWN_PATH)
        asking {
            completion(
                Timeline(
                    entries: [made(at: now, asking: $0)],
                    policy: .after(now.addingTimeInterval(900))))
        }
    }

    // THE TILES THE PHONE SAYS ARE PLACED, TURNED INTO THE FEEDS THOSE TILES ASK FOR.
    private func asking(_ then: @escaping (Set<String>) -> Void) {
        WidgetCenter.shared.getCurrentConfigurations { found in
            let placed = (try? found.get())?.map(\.kind) ?? []
            then(FeedKinds.asking(placed: placed, table: FeedKinds.table()))
        }
    }

    private func made(at now: Date, asking: Set<String>) -> FreshnessEntry {
        FreshnessReading.reading(taken: Freshness.nowTaken(), asking: asking, now: now)
    }
}

struct FreshnessHomeView: View {
    let entry: FreshnessEntry

    var body: some View {
        Button(intent: RefreshEveryTile()) {
            VStack(alignment: .leading, spacing: SPACING_0_5) {
                Text("OLDEST READING")
                    .font(.caption2.weight(.semibold))
                    .foregroundStyle(.secondary)
                age
                if let named = entry.stalestName {
                    Text(named)
                        .font(.caption2.weight(.semibold))
                        .lineLimit(1)
                        .minimumScaleFactor(0.6)
                }
                Spacer()
                Text(entry.tiles == 0 ? "no feed has answered yet" : "\(entry.tiles) feeds")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
        }
        .buttonStyle(.plain)
        .containerBackground(for: .widget) { Color(.systemBackground) }
    }

    @ViewBuilder private var age: some View {
        if let stalest = entry.stalest {
            Text(stalest, style: .timer)
                .font(.system(size: 30, weight: .semibold, design: .rounded))
                .monospacedDigit()
                .lineLimit(1)
                .minimumScaleFactor(0.5)
                .invalidatableContent()
        } else {
            Text("—")
                .font(.system(size: 30, weight: .semibold, design: .rounded))
                .foregroundStyle(.secondary)
        }
    }
}

struct FreshnessWidget: Widget {
    let kind = FreshnessReading.OWN_KIND

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FreshnessProvider()) { entry in
            FreshnessHomeView(entry: entry)
        }
        .configurationDisplayName("Freshness")
        .description("How old the oldest reading on your tiles is. Tap to refresh them all.")
        .supportedFamilies([.systemSmall])
    }
}
