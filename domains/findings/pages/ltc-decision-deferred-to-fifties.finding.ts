import type { Finding } from "../finding.page-type.ts"

export const ltcDecisionDeferredToFifties = {
  id: "01a06555-9f3e-7fbb-bf0d-613cc23cf1ff",
  pageTypeSlug: "finding",
  slug: "ltc-decision-deferred-to-fifties",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's current strategy for long-term care is to self-insure from his asset base, and it is implicit rather than decided — no policy has been bought and no decision has been recorded. The deferral has a stated end: the cost-benefit is worth re-running between the ages of 55 and 60. What holds that date is nothing more durable than the item itself, since no calendar marker has been set.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 67 as `WATCH/ltc-reevaluation` (was item 42), citing the long-term-care section of `notes/insurance.md`, and asking for a calendar marker rather than for the item to be carried as pending.\n\nWhat I did not measure: I did not read `notes/insurance.md`, so that self-insurance is the implicit strategy is the backlog's characterisation — the word implicit is its own, which is what tells me no decision was recorded. That no marker has been set is what the item's open status implies as of 2026-07-10; I did not check any calendar. I did not establish Alan's current age, so how far off the window is I cannot say.",
} as const satisfies Finding
