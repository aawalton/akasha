import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const galleryCardSize = {
  id: "01a0680d-4d00-7011-8d69-5f1a4c7b4112",
  type: "page-type/select-property",
  slug: "gallery-card-size",
  propertySlug: "gallery-card-size",
  definition: "how large a gallery draws a card",
  values: ["small", "medium", "large"],
  types: "ts",
  createdAt: "2026-09-03T16:14:57.280Z",
  updatedAt: "2026-09-22T10:09:59.000Z",
} as const satisfies SelectProperty
