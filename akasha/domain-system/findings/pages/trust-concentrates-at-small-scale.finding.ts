import type { Finding } from "../finding.page-type.ts"

export const trustConcentratesAtSmallScale = {
  id: "01a06555-9f3f-79ff-a04c-fe54e50c6187",
  pageTypeSlug: "finding",
  slug: "trust-concentrates-at-small-scale",
  domainSlug: "domain/all-about-alan",
  claim:
    "Across Alan's audits the B grades sit in one place: local, individual, person-to-person relationships. Costco Pharmacy, Dr Robinson, the pediatric dentist and Edgemont Auto all reach B in sectors graded C or D by default, while the banking audit peaked at an institutional B and never a personal one. What the outliers share is deliberate structural alignment. Grading at that level carries a fragility — a person can leave, sell or change — and the institution's grade is the floor left behind.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds four items under the FRAME thread of `backlog/personal-freedom.md`: `individual-vs-institutional` (line 42, was item 27), `scale-vs-trust` (line 43, was item 28), `aligned-outliers` (line 50, was item 49) and `scrutiny-threshold` (line 51, sweep 2026-07-02). The first three are one pattern seen from three sides — where B grades appear, why, and what it costs to grade that way — and the fourth is the unset threshold for the shortened scrutiny period that structural alignment earns, which only exists because of that pattern.\n\nThe aligned outliers item also names Utah's homeschool law and Costco's member-first orientation as structurally aligned cases.\n\nWhat I did not measure: I read none of the audit notes, so every grade here is the backlog's. I did not verify that no person-to-person B appears in the banking audit; that is the item's claim.",
} as const satisfies Finding
