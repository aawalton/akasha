import type { Finding } from "../finding.page-type.ts"

export const federalEscalationSignalsUndefined = {
  id: "01a06555-9f3e-768a-b74c-282f02f8e83b",
  pageTypeSlug: "finding",
  slug: "federal-escalation-signals-undefined",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's involuntary federal dependencies cannot be exited while he stays in the country, so watching them is the whole of the strategy, and the signals to watch for are undefined. The candidates named are patterns in IRS audit targeting, politicisation of passports, changes to Selective Service rules, changes to expatriation tax law, and broader regulatory capture. Escalation on any of them would re-open the US-citizenship layer of his constraint cascade rather than affect one entry.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds two items under the WATCH thread of `backlog/personal-freedom.md`: `federal-monitoring` (line 69, was item 47, from `notes/government-services.md`) and `citizenship-escalation` (line 72, was item 55, from `notes/invisible-constraints.md`). The second is the same watch stated with the cascade framing and largely the same signal list, which is why I took them as one observation. Both compose with `notes/capture-events.md` and with the capture-monitor item I filed separately.\n\nWhat I did not measure: I read none of those notes, so the cascade and its citizenship layer are the backlog's account. The signal list is the items' own and neither is a monitoring practice anyone runs today. An annual review is the second item's default cadence, not one I confirmed is in place.",
} as const satisfies Finding
