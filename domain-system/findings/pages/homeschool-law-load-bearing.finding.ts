import type { Finding } from "../finding.page-type.ts"

export const homeschoolLawLoadBearing = {
  id: "01a06555-9f3e-7489-b4da-a8889e7c6098",
  pageTypeSlug: "finding",
  slug: "homeschool-law-load-bearing",
  domainSlug: "domain/all-about-alan",
  claim:
    "Utah's homeschool law is the one government service in Alan's inventory graded B, and it carries more than the household's education strategy: it is the positive that lifts Utah's own conditional grade from D to C. Erosion of it — curriculum approval, testing requirements, parent-qualification rules — would re-open the whole Utah-residency layer of his constraint cascade rather than downgrade one entry. Nobody tracks the legislative sessions where such a change would appear.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds two items under the WATCH thread of `backlog/personal-freedom.md`: `homeschool-law` (line 68, was item 45, from `notes/government-services.md`) and `homeschool-cascade` (line 73, was item 56, from `notes/invisible-constraints.md`). The second says outright that it reaffirms the first with the cascade framing added, which is why I took them as one observation.\n\nBoth record an annual review as the default cadence, tightening if a session produces a concrete bill.\n\nWhat I did not measure: I read neither note, so the B grade, the D-to-C lift and the cascade structure are the backlog's account. \"Nobody tracks the sessions\" is what the item's open status implies rather than something stated; the cadence is described as needing to be settled, which means it was not running as of 2026-07-10.",
} as const satisfies Finding
