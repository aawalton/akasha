import type { Finding } from "../finding.page-type.ts"

export const theSeatLogIsABoundedRollingWindowRatherThanAccretion = {
  id: "01a0655a-5fb2-7623-9418-9885002981cd",
  pageTypeSlug: "finding",
  slug: "the-seat-log-is-a-bounded-rolling-window-rather-than-accretion",
  domainSlug: "domain/akasha-migration",
  claim:
    "`pages/seat-log-day` is the largest folder in the messaging and logging family at 332 pages, and none of it is accreted. It is a seven-day window that a working sweeper holds at that size, written to seconds ago by the supervisor running this swarm. Ablating it would delete live state and the writer would put most of it back within the minute.",
  evidence:
    "Measured 2026-09-03T03:29Z.\n\nIT IS LIVE. `pages/seat-log-day/supervisor-transport-akasha-2026-09-03.lines.uncommitted.jsonl` had an mtime 47 seconds before I looked. `tools/lib/log-append.ts:49` opens a day through `whereFor` and `:52` writes the page where none is there, so the pages are made by the supervisor and oauth proxy that carry this fleet, not left behind by something replaced. Three sources write: oauth-proxy-console 113 pages, supervisor-console 112, supervisor-transport 107.\n\nIT IS BOUNDED. Dates run 2026-08-26 to 2026-09-03, nine calendar days, at 19 to 45 pages a day. `services/sweep-log-days.ts` keeps 7 days by the date the page states. `sweep-log-days.timer` is loaded and enabled, has been active since 2026-08-27, and next fires 2026-09-03 00:01 local. Its last run, 2026-09-02 00:03:17, printed `removed 22 of 22 log day(s) older than 2026-08-26; 303 kept`. Asked today without `--remove` it answers `read 332 log day(s), 45 older than 2026-08-27` — that 45 is tonight's sweep, not a backlog.\n\nSO THE HEADLINE COUNT MISLEADS. 332 is a steady state, not a total. The folder cannot grow past about nine days of one fleet, and every page in it is younger than the migration.\n\nI did not sweep the 45 by hand. The timer takes them in two hours and doing it early would only move 45 removal commits earlier.\n\nWhat this folder needs is migration of its writer and its page type into `akasha/seat-system`, where `seat-system.workspace-package.ts` already states as a gap that nothing outside akasha says what a seat is. It does not need ablation. Alan's 10,000-20,000 accreted files are not here.",
} as const satisfies Finding
