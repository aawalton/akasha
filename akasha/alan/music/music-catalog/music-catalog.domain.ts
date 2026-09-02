import type { Domain } from "../../../domain-system/domain/domain.page-type.ts"

export const musicCatalog = {
  id: "01a06238-8d2c-7f24-81f1-c8b7232268d3",
  pageTypeSlug: "domain",
  slug: "music-catalog",
  definition: "the songs and the artists who made them",
} as const satisfies Domain
