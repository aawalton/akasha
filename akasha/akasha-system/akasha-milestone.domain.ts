import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaMilestone = {
  id: "01a049e9-651d-7003-85de-06ea68e1dd6c",
  pageTypeSlug: "domain",
  slug: "akasha-milestone",
  definition: "a state the migration passes through",
  partSlugs: [
    "domain/akasha-functional-core",
    "domain/akasha-required-reading",
    "domain/akasha-alone",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "This domain's parts are the milestones themselves, in the order the migration passes through them.",
    },
  ],
} as const satisfies Domain
