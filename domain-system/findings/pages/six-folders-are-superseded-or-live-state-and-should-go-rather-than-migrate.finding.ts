import type { Finding } from "../finding.page-type.ts"

export const sixFoldersAreSupersededOrLiveStateAndShouldGoRatherThanMigrate = {
  id: "01a06551-7018-7d41-8f45-0388444b1f17",
  pageTypeSlug: "finding",
  slug: "six-folders-are-superseded-or-live-state-and-should-go-rather-than-migrate",
  domainSlug: "domain/akasha-migration",
  claim:
    "Six `pages/` folders holding 586 files are not migration work. Two hold a coarser grain of data akasha already keeps more finely, and four hold running editor state that is rewritten every few minutes. Assigning any of them to an agent as content to move would produce page types nobody wants.",
  evidence:
    "Measured on 2026-09-02.\n\ntemper-net-worth-day holds 94 markdown pages and 94 sidecars. akasha holds 789 temper-net-worth-hour pages. Both series start on 2026-04-29. The day pages stop at 2026-08-29; the hour pages run to 2026-09-02, still being written today. `temper-net-worth-hour.page-type.ts` states the departure `An hour rather than a day gathers the readings`, so the finer grain is the deliberate replacement rather than a parallel record.\n\ntemper-completed-month holds 6 markdown pages and 6 sidecars covering 2026-03 to 2026-08. akasha holds 119 temper-completed-day pages covering 2026-03-05 to 2026-08-27. `temper-completed-day.page-type.ts` states `A month of completions runs past the most bytes one file may hold`, which is why the day grain exists.\n\nThe four editor folders hold 24 markdown pages against 362 sidecars, and 362 of those 386 files are named `uncommitted`: code-editor-terminal 195 of 211, code-editor-window 160 of 161, code-editor-group-tab 5 of 10, code-editor-group 2 of 4. The window sidecars carried timestamps from the hour I looked; the terminal sidecars hold process exit status written when a terminal closes. This is a live editor's own bookkeeping.\n\nThe caution is that superseded is not the same as matched. I compared date ranges and grain, not values. Nobody should delete the day and month folders until a per-file check confirms every reading in them is reachable in the hour and day pages, because a gap in the finer series would be lost silently. The editor folders need no such check, but they do need whatever writes them to stop first.",
} as const satisfies Finding
