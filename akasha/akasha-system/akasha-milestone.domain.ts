import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaMilestone = {
  id: "01a049e9-651d-7003-85de-06ea68e1dd6c",
  pageTypeSlug: "domain",
  slug: "akasha-milestone",
  definition: "a state the migration passes through",
  partSlugs: ["domain/akasha-functional-core"],
  requiredReadingSlugs: [],
} as const satisfies Domain
