import type { Finding } from "../finding.page-type.ts"

export const termLifeCoverOutlastsNeed = {
  id: "01a06555-9f3f-70f8-b483-825db71f82ab",
  pageTypeSlug: "finding",
  slug: "term-life-cover-outlasts-need",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan carries $4M of term life cover against a need that shrinks as his children reach independence — Lizzy in five to seven years, Joseph in seven to nine, Katara in ten or more. Nothing re-evaluates the face value against that shrinking need on any cadence, and nothing tracks the policies' expiration dates or their renewal and re-rate windows, so cover could drop off at a moment nobody chose.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 66 as `WATCH/term-life-cadence` (was item 41), citing the term-life section of `notes/insurance.md` and proposing an annual review as the default cadence, to land as a recurring entry once the cadence is settled.\n\nWhat I did not measure: I did not read `notes/insurance.md`, so the $4M face value, the three children's ages and the independence windows are the backlog's figures, recorded there as of 2026-07-02. That no cadence is running is what the item's open status implies. My closing clause about cover dropping off unchosen restates the item's concern about expiration dates rather than adding evidence.",
} as const satisfies Finding
