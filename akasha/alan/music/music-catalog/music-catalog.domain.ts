import type { Domain } from "../../../domain-system/domain/domain.page-type.ts"

export const musicCatalog = {
  id: "01a06238-8d2c-7f24-81f1-c8b7232268d3",
  pageTypeSlug: "domain",
  slug: "music-catalog",
  definition: "the songs and the artists who made them",
  partSlugs: [
    "page-type/artist",
    "page-type/song",
    "text-property/catalog-tags",
    "text-property/external-id",
    "text-property/external-link",
    "text-property/last-synced-at",
    "text-property/rating",
    "text-property/source",
  ],
} as const satisfies Domain
