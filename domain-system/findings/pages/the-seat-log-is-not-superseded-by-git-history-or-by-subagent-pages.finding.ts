import type { Finding } from "../finding.page-type.ts"

export const theSeatLogIsNotSupersededByGitHistoryOrBySubagentPages = {
  id: "01a06575-401b-713e-89ef-744add4b02ab",
  pageTypeSlug: "finding",
  slug: "the-seat-log-is-not-superseded-by-git-history-or-by-subagent-pages",
  domainSlug: "domain/akasha-migration",
  claim:
    "`pages/seat-log-day` is not superseded. Its three sources record what the proxy and supervisor processes did on an agent's behalf, and neither git history nor a subagent page holds one field of it. The rate-limit history is the proof and also the warning: pooled over the window it reads 48 percent of requests refused, and split by day it is a resolved incident on 26 and 28 August, with the last five days under 2 percent. Only these lines can tell the two apart.",
  evidence:
    "Measured 2026-09-03T04:08Z. A supervisor-transport file had an mtime of the second I looked, so the writer is live.\n\nWHAT THE LINES HOLD. 402,575 supervisor-transport rows, each a `data` record of fifteen keys: account, bytesUpstream, elapsedMs, emptyPoolReason, errorClass, errorMessage, framesUpstream, heldMs, httpStatus, lastEventType, lastFrameAgoMs, path, sawMessageStop, termination, ts. Eight Claude accounts appear, ctw 72,367 down to amywalton 24,805.\n\nTHE POOLED NUMBER MISLEADS AND I PUBLISHED IT FIRST. 193,531 of 402,575 rows are httpStatus 429, 48 percent. By day: 08-26 369,010 of 416,332 at 88.6 percent; 08-27 51.8; 08-28 216,896 of 277,986 at 78.0; then 08-29 5.9, 08-30 1.4, 08-31 1.8, 09-01 0.5, 09-02 1.3, 09-03 0.4. So the pool is two bad days carrying seven quiet ones, and the fleet is not rate limited tonight. A number pooled across a window that holds an incident reports the incident as the condition.\n\nWHAT THE ALTERNATIVES HOLD. A subagent page carries seven keys and no time, account, status or duration. Git history records what an agent wrote, not what the proxy did to get it an answer. Neither could have produced either reading, so neither could have corrected the other.\n\nMIGRATION READINESS. 51 page stems have `lines.partN` sidecars; 49 are numbered from part2 with no gap and a base file beside them. The 2 gaps are the five orphans of `five-rows-files-no-page-names-are-the-only-copy-of-their-lines`.",
} as const satisfies Finding
