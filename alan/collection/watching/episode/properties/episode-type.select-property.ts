import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const episodeType = {
  id: "01a06599-ee09-700b-b9c1-3c28e65e2b56",
  type: "page-type/select-property",
  slug: "episode-type",
  propertySlug: "episode-type",
  definition: "the part an episode plays in its season",
  values: ["standard", "mid-season", "finale"],

  types: "ts",
  createdAt: "2026-09-03T04:49:41.897Z",
  updatedAt: "2026-10-30T15:20:23.393Z",
} as const satisfies SelectProperty
