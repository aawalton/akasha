import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaMilestone = {
  id: "01a049e9-651d-7003-85de-06ea68e1dd6c",
  pageTypeSlug: "domain",
  slug: "akasha-milestone",
  definition: "a state the migration passes through",
  partSlugs: ["domain/akasha-functional-core", "domain/akasha-alone"],
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "departure",
      statement:
        "This domain's parts are the milestones themselves, in the order the migration passes through them.",
    },
    {
      invariantKind: "departure",
      statement: "Milestones turn from capabilities into coverage as the migration runs.",
    },
  ],
} as const satisfies Domain
