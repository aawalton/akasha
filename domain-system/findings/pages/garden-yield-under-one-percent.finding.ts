import type { Finding } from "../finding.page-type.ts"

export const gardenYieldUnderOnePercent = {
  id: "01a06555-9f3e-7b37-8f13-dcbb84abea79",
  pageTypeSlug: "finding",
  slug: "garden-yield-under-one-percent",
  domainSlug: "domain/all-about-alan",
  claim:
    "The infrastructure for food self-reliance is already built at Alan's house — eight raised beds of four feet by eight, and eight fruit trees, six of them mature — and it supplies less than one percent of what the household eats. The bottleneck is not capital: it is the harvest-and-preserve workflow, the planting decisions, and an operational rhythm that does not exist. Jenny already has the food-preservation capability the ramp would run through.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 92 as `FOOD/garden-ramp` (was item 35), citing the strategy section of `notes/food.md` and ranking it the highest-leverage food-self-reliance move available.\n\nThis is the concrete instance behind the more general finding I filed on the not-needing direction's unnamed phases: a capability built but not operating.\n\nWhat I did not measure: I did not read `notes/food.md`, so the bed count, the tree count and the under-one-percent figure are the backlog's as of 2026-07-02, and I did not check how that fraction was estimated. That Jenny has preservation capability is the item's statement, not hers as recorded to me.",
} as const satisfies Finding
