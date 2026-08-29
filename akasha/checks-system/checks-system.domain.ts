import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const checksSystem = {
  id: "01a04b5e-39e4-7a3d-b81f-d36d1bcf7103",
  pageTypeSlug: "domain",
  slug: "checks-system",
  definition: "how a change is judged against what must be true of it",
  partSlugs: ["page-type/check", "module/checking"],
  requiredReadingSlugs: ["domain/akasha-check", "page-type/check", "module/checking"],
  design: [
    "The checks reach the akasha folder and nothing above it.",
    "A change is judged before it reaches disk, so a refused change leaves nothing behind.",
  ],
} as const satisfies Domain
