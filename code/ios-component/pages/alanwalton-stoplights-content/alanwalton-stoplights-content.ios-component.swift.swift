import ActivityKit
import Foundation

// THE ONE DECLARATION OF WHAT THE STOPLIGHTS ACTIVITY CARRIES, COMPILED INTO BOTH TARGETS.
//
// The app starts the activity and pushes to it, and the widget extension draws it.
// ActivityKit holds the two sides together by the name of the attributes type and by what
// its content decodes to, so a second declaration that drifted would leave an activity that
// starts and never draws. The app seam adds this same file to the app target rather than
// restating it there.
//
// A TIER IS CARRIED AS THE WORD THE SERVER SENT RATHER THAN AS THE COLOR DRAWN.
//
// Which color a word draws is the extension's to say, and saying it here would pull the
// whole drawing into the app target, which starts the activity and draws none of it.

struct ActivityStoplight: Codable, Hashable, Identifiable {
    let key: String
    let label: String
    let tier: String
    let reading: String?
    let nextTier: String?
    let progress: Double?

    var id: String { key }
}

struct StoplightsAttributes: ActivityAttributes {
    struct ContentState: Codable, Hashable {
        let upkeep: [ActivityStoplight]
        let inboxes: [ActivityStoplight]
        let attributes: [ActivityStoplight]
        let takenAt: Date
    }
}

extension StoplightsAttributes.ContentState {
    var all: [ActivityStoplight] { upkeep + inboxes + attributes }
}
