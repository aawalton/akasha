import type { Finding } from "../finding.page-type.ts"

export const conditionalGradesUnstated = {
  id: "01a06555-9f3d-7dfc-ad0a-63d5c0957452",
  pageTypeSlug: "finding",
  slug: "conditional-grades-unstated",
  domainSlug: "domain/all-about-alan",
  claim:
    "Some grades across Alan's nine audit files are conditional on an outer constraint without saying so. A grade resting on his residency, his jurisdiction, or a position further up the constraint cascade reads identically to one resting on the organisation itself, so a reader cannot tell which grades would move if the outer condition changed. Most grades given to third-party organisations are not conditional; the residency-rooted, jurisdiction-rooted and cascade-rooted ones are.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 21 as `AUDIT/conditional-grading` (was item 58), which cites `notes/grading-scale.md#conditional-grading` and lists the nine audit files to review: banking, software-and-SaaS, healthcare, transportation, utilities, food, insurance, government-services and information-and-media.\n\nWhat I did not measure: I read none of the nine, so which grades are implicitly conditional is entirely the item's expectation rather than a survey anyone has run — the item says the review is to identify them, which means the count is unknown. My middle sentence, about a reader being unable to tell the two apart, is my own reading of why it matters.",
} as const satisfies Finding
