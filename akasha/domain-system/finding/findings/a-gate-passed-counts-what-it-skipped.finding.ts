import type { Finding } from "../finding.page-type.ts"

export const aGatePassedCountsWhatItSkipped = {
  id: "01a04d5f-4a9e-7705-8475-2a2340fd926a",
  pageTypeSlug: "finding",
  slug: "a-gate-passed-counts-what-it-skipped",
  domainSlug: "domain/command-system",
  claim:
    "A landing reports every check passing over a number of changes that includes the ones no check was handed, so the count overstates what was judged.",
  evidence:
    "The line counts the changes asked for rather than the changes judged, and the runner skips a change whose body is null, a deletion having no body to hand a check. A move of three files produces three writes and three deletions, so it reports a gate passing over six when three were seen. Write and edit overstate the same way whenever a call carries a removal beside a body. The count is the only number a caller gets about how much was judged, and it is the number they would use to decide whether the gate looked at what they cared about. The deeper fault is the one already recorded, that a check is never handed a deletion, so a truthful count would read three of six judged and invite the question of what happened to the other three. Recorded rather than fixed because the honest wording depends on whether deletions become judgeable, and changing the count alone would make the report accurate about a gate that is still blind.",
} as const satisfies Finding
