import type { Finding } from "../finding.page-type.ts"

export const rankedRemediationPlanAbsent = {
  id: "01a06555-9f3e-77dd-804a-463563cbac9a",
  pageTypeSlug: "finding",
  slug: "ranked-remediation-plan-absent",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan has a ranking criterion and a set of populated audits, and no ranked remediation plan has ever been generated from them. Nothing sorts his dependencies by risk-adjusted exposure, so what to remediate first is decided case by case rather than by the framework built to decide it — and the framework's own output, a sorted list with proposed remediations walked from the alternatives note for the top entries, does not exist in any version.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 19 as `AUDIT/ranked-plan` (was item 20), which names `notes/ranking-criterion.md` as the framework to apply, `notes/alternatives.md` as the source of proposed remediations, and `notes/ranked.md` as where a first version would land.\n\nWhat I did not measure: I did not check the books repository for `notes/ranked.md`, so its absence is the backlog's account rather than mine. My sentence that priorities are decided case by case is an inference from the plan's absence, not something recorded — the spine's own ordering section (`backlog.md` §5) shows one ordering does exist for interview purposes, though not for remediation.",
} as const satisfies Finding
