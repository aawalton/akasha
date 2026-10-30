import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const side = {
  id: "01a06558-36e9-7eab-9e75-8ad48e61258a",
  type: "page-type/select-property",
  slug: "side",
  propertySlug: "side",
  definition: "the side of the body a measurement was made on",
  values: ["left", "right", "n-a"],
  types: "ts",
  createdAt: "2026-09-03T03:37:55.177Z",
  updatedAt: "2026-10-30T16:51:31.733Z",
} as const satisfies SelectProperty
