import type { Finding } from "../finding.page-type.ts"

export const healthcareAuditGaps = {
  id: "01a06555-9f3e-736d-aef0-517ea046ebf9",
  pageTypeSlug: "finding",
  slug: "healthcare-audit-gaps",
  domainSlug: "domain/all-about-alan",
  claim:
    "Two gaps stand open in the healthcare audit of a five-person household. No eye-care provider is captured at all, so none has been graded against the framework. And there is no recorded plan for care outside routine hours — no stated urgent-care preference, no chosen emergency room, nothing for after-hours or weekend need. Both are the kind of dependency that is discovered under pressure rather than chosen.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds two items under the MEDS thread of `backlog/personal-freedom.md`: `eye-care` (line 80, was item 24) and `emergency-care` (line 81, was item 25). Both are recorded in the open-audit-gaps section of `notes/healthcare.md` and both are absences of the same kind in the same audit, which is why I took them as one observation.\n\nWhat I did not measure: I did not read `notes/healthcare.md`, so both gaps are as the backlog reports them. Absent from the audit is not the same as absent in life — the household may well use an optometrist nobody has written down, and the items ask for the provider to be surfaced rather than chosen. My last sentence is my own reading, not the items'.",
} as const satisfies Finding
