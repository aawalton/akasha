import type { Finding } from "../finding.page-type.ts"

export const insuranceSingleVendorNoUmbrella = {
  id: "01a06555-9f3e-7c92-836d-6356c432945c",
  pageTypeSlug: "finding",
  slug: "insurance-single-vendor-no-umbrella",
  domainSlug: "domain/all-about-alan",
  claim:
    "One D-grade vendor, State Farm, carries both Alan's home and auto insurance, which doubles what a capture event or a behaviour failure there would cost him. Meanwhile no umbrella policy covers tail liability against roughly $1.75M of investable assets and $1.2M of home equity, at a typical cost of $200 to $500 a year. Both decisions turn on the same absent thing: a B-tier insurer. Without one, adding the umbrella at State Farm is the cheaper path and deepens the bundle.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds two items under the VENDOR thread of `backlog/personal-freedom.md`: `umbrella-insurance` (line 28, was item 17) and `state-farm-bundle` (line 30, was item 40). Both cite `notes/insurance.md` and both are governed by the same condition — whether a B-tier carrier exists — which is why I took them as one observation. The bundle item records the sector as D by default, so switching to a peer would not improve the grade, and names USAA as ineligible.\n\nWhat I did not measure: I did not read `notes/insurance.md` or `notes/grading-scale.md`, so the asset figures, the premium range and the grades are the backlog's. I did not check whether a B-tier carrier is in fact available. The last sentence is my reading of how the two items interact; the backlog states the default without naming the tension.",
} as const satisfies Finding
