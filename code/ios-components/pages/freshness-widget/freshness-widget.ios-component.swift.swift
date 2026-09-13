import AppIntents
import SwiftUI
import WidgetKit

// WHAT THE TILES THEMSELVES ARE DOING, WHICH NOTHING ELSE ON THE PHONE WRITES DOWN.
//
// WidgetKit grants a tile between forty and seventy reloads a day and never says which of the
// ones asked for it honoured. `getTimeline` running is the one moment a tile learns it was
// granted one, so that is where the note is made. The notes are kept so the grant can be read
// off the phone rather than guessed at.
//
// Every tile of one app shares the extension's defaults, so a note one tile writes is a note
// every other tile can read. The lines are spelled rather than archived because a store this
// small is read by eye as often as by code.
enum ReloadLog {
    static let KEPT = 240
    static let KEY = "reload-log"
    static let PARTED: Character = "|"

    struct Noted: Equatable {
        let path: String
        let at: Date
    }

    static func spelling(_ one: Noted) -> String {
        one.path + String(PARTED) + String(Int(one.at.timeIntervalSince1970))
    }

    static func reading(_ line: String) -> Noted? {
        guard let parted = line.lastIndex(of: PARTED) else { return nil }
        let said = String(line[line.index(after: parted)...])
        guard let seconds = Double(said), seconds > 0 else { return nil }
        return Noted(path: String(line[..<parted]), at: Date(timeIntervalSince1970: seconds))
    }

    static func noting(_ kept: [String], _ one: Noted, keeping: Int = KEPT) -> [String] {
        let grown = kept + [spelling(one)]
        guard grown.count > keeping else { return grown }
        return Array(grown.suffix(keeping))
    }

    static func since(_ kept: [String], _ moment: Date) -> [Noted] {
        kept.compactMap(reading).filter { $0.at >= moment }
    }

    static func perPath(_ noted: [Noted]) -> [String: Int] {
        var counted: [String: Int] = [:]
        for one in noted { counted[one.path, default: 0] += 1 }
        return counted
    }

    static func fewestAndMost(_ counted: [String: Int]) -> (fewest: Int, most: Int)? {
        guard let fewest = counted.values.min(), let most = counted.values.max() else { return nil }
        return (fewest, most)
    }

    static func note(_ path: String, at moment: Date = Date()) {
        let kept = UserDefaults.standard.stringArray(forKey: KEY) ?? []
        UserDefaults.standard.set(noting(kept, Noted(path: path, at: moment)), forKey: KEY)
    }

    static func kept() -> [String] {
        UserDefaults.standard.stringArray(forKey: KEY) ?? []
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
    let reloads: Int
    let fewest: Int
    let most: Int
}

// A HARNESS DRAWS THIS TILE FROM A BODY, SINCE THE STORE IT READS IS THE PHONE'S OWN.
struct FreshnessReadout: Decodable {
    let stalestSecondsAgo: Double?
    let stalestName: String?
    let tiles: Int
    let reloads: Int
    let fewest: Int
    let most: Int
}

enum FreshnessReading {
    static let OVER: TimeInterval = 24 * 60 * 60
    static let OWN_PATH = "/freshness"

    static func reading(taken: [String: Date], kept: [String], now: Date) -> FreshnessEntry {
        let noted = ReloadLog.since(kept, now.addingTimeInterval(-OVER))
        let band = ReloadLog.fewestAndMost(ReloadLog.perPath(noted))
        let oldest = Freshness.stalest(taken)
        return FreshnessEntry(
            date: now, stalest: oldest?.at, stalestName: oldest.map { Freshness.naming($0.path) },
            tiles: taken.count, reloads: noted.count, fewest: band?.fewest ?? 0,
            most: band?.most ?? 0)
    }

    static func made(_ readout: FreshnessReadout, at now: Date) -> FreshnessEntry {
        FreshnessEntry(
            date: now, stalest: readout.stalestSecondsAgo.map { now.addingTimeInterval(-$0) },
            stalestName: readout.stalestName, tiles: readout.tiles, reloads: readout.reloads,
            fewest: readout.fewest, most: readout.most)
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
            stalestName: "claude-usage", tiles: 8, reloads: 46, fewest: 4, most: 9)
    }

    func getSnapshot(
        in context: TimelineProviderContext, completion: @escaping (FreshnessEntry) -> Void
    ) {
        if context.isPreview {
            completion(placeholder(in: context))
            return
        }
        completion(made(at: Date()))
    }

    func getTimeline(
        in context: TimelineProviderContext, completion: @escaping (Timeline<FreshnessEntry>) -> Void
    ) {
        let now = Date()
        ReloadLog.note(FreshnessReading.OWN_PATH, at: now)
        completion(Timeline(entries: [made(at: now)], policy: .after(now.addingTimeInterval(900))))
    }

    private func made(at now: Date) -> FreshnessEntry {
        FreshnessReading.reading(taken: Freshness.nowTaken(), kept: ReloadLog.kept(), now: now)
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
                Text("24h \(entry.reloads) · \(entry.fewest)–\(entry.most) each")
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
    let kind = "FreshnessWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: FreshnessProvider()) { entry in
            FreshnessHomeView(entry: entry)
        }
        .configurationDisplayName("Freshness")
        .description("How old the oldest reading on your tiles is. Tap to refresh them all.")
        .supportedFamilies([.systemSmall])
    }
}
