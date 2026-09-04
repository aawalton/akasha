import type { Finding } from "../finding.page-type.ts"

export const usedEvCriteriaUnlisted = {
  id: "01a06555-9f3f-7c1c-9393-33cae2b79328",
  pageTypeSlug: "finding",
  slug: "used-ev-criteria-unlisted",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's vehicle-replacement plan wants a used EV chosen on durability and maintainability — older simpler designs, an established parts supply, repair knowledge available, and as little manufacturer software lock-in as possible — and no specific models have been identified against those criteria. The step sits second in a three-step transport-autonomy strategy and orders behind rooftop solar.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 86 as `SOLAR/used-ev-list` (was item 29), surfaced from the strategy section of `notes/transportation.md`. The spine (`backlog.md` line 44) records rooftop solar as ordering ahead of it.\n\nI kept it apart from the rooftop-solar fold because the criteria here are about a vehicle's repairability rather than about the electrification sequence, even though the two are ordered against each other.\n\nWhat I did not measure: I did not read `notes/transportation.md`, so the criteria and the three-step strategy are the backlog's account. That no candidate list exists is what the item's open status implies as of 2026-07-10.",
} as const satisfies Finding
