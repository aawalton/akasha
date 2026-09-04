import type { Finding } from "../finding.page-type.ts"

export const meaningfulDependenciesUncarved = {
  id: "01a06555-9f3e-77ef-b25a-1cbaf0bdd514",
  pageTypeSlug: "finding",
  slug: "meaningful-dependencies-uncarved",
  domainSlug: "domain/all-about-alan",
  claim:
    "Some of Alan's dependencies are chosen because they mean something, not defaulted into, and his framework has no space for them — so they read as D-tier targets while being nothing of the kind. Jenny's restaurant-going as a hobby, the commitment to a family of five, the children's homeschooling, and the deliberately Provo-anchored life are all anchored by design rather than by default. The framework grades them the same as any dependency and offers no carve-out from grade-driven remediation.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. This folds two items under the FRAME thread of `backlog/personal-freedom.md`: `hobby-vs-dependency` (line 45, was item 38) and `chosen-because-meaningful` (line 52, was item 59). The second names the first as its sibling and says the two may collapse into one essay, which is why I took them as one observation. They surface from `notes/food.md` and `notes/invisible-constraints.md` and both compose with `notes/ranking-criterion.md`.\n\nThe anchored-by-design against anchored-by-default distinction is the second item's own framing.\n\nWhat I did not measure: I read none of those notes. Jenny's restaurant-going being a hobby rather than a target is the corpus's reading as the backlog relays it, and I did not find Jenny's or Alan's own words on it. Whether the two items should merge is left open there and I have not settled it by folding them.",
} as const satisfies Finding
