import type { Finding } from "../finding.page-type.ts"

export const aPollersCommitMessageOutlivesThePoller = {
  id: "01a0675f-1b42-7a08-9c31-4d7e6b0f2a95",
  pageTypeSlug: "finding",
  slug: "a-pollers-commit-message-outlives-the-poller",
  domainSlug: "domain/akasha-migration",
  claim:
    "Two commits titled `monarch: 11018 transaction(s) landed from the poller` landed at 07:02 and 07:04 on 2026-09-03, after monarch-poll.timer was disabled at 06:58. They were not the poller. A migration lane running the same monarch/land-files.ts reuses that message, and the two are told apart by which months they touch: the poller writes only the months whose rows moved, while the lane rewrote every month from 2021-07 onward.",
  evidence:
    "Checked 2026-09-03 07:04 to 07:10 MDT, after almost halting on the message alone.\n\nTHE MESSAGE MATCHES BOTH. `monarch/land-files.ts` holds the one template. The 06:56 run, the last before the timer went, wrote month-2025-09 through month-2026-09, thirteen months, all recent. The 07:04 commit wrote month-2021-07 through 2026, the whole archive, and carries `Checks-bypassed: a change-mechanical change runs no check`, which is the mechanical landing route a custom migration takes rather than the route a service takes.\n\nTHE SERVICE DID NOT DO IT. `journalctl --user -u monarch-poll.service` records `Stopped monarch-poll.timer` at 06:58:26 and one later run, 07:00:13, that started and finished inside the same second on 636ms of wall clock and committed nothing — git log over 06:59 to 07:01:30 holds only lane commits. There is no journal entry at 07:02 or 07:04, and `pgrep -af monarch` answers nothing.\n\nTHE TIMER CANNOT FIRE. `systemctl --user show monarch-poll.timer` answers LoadState=not-found, and `list-dependencies --reverse monarch-poll.service` names nothing but the unit itself, so no path unit and no second timer reaches it. The 07:00:13 run was therefore an explicit `systemctl --user start` by something in the swarm, not a schedule.\n\nWHAT THIS COSTS A LATER READER. Grepping commit titles for a service's name over-counts that service, because a lane migrating the service's data inherits its message. Read the paths and the journal before concluding a unit is still alive.",
} as const satisfies Finding
