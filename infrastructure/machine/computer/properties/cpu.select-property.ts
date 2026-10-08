import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const cpu = {
  id: "01a0658c-329a-7f4d-8196-79171c58a3a3",
  type: "page-type/select-property",
  slug: "cpu",
  propertySlug: "cpu",
  definition: "which processor it runs",
  values: [
    "intel-core-ultra-9-285",
    "apple-m1-max",
    "amd-ryzen-5-3600",
    "intel-core-i7-14700f",
    "intel-core-i7-3930k",
    "intel-core-i7-10700f",
    "intel-core-i7-7800x",
    "intel-core-i7-9700f",
    "intel-core-ultra-5-225f",
    "intel-core-ultra-7-255h",
    "amd-ryzen-7-8700f",
    "intel-core-ultra-7-265",
    "amd-ryzen-9-5950x",
  ],
  types: "ts",
  createdAt: "2026-09-03T04:34:41.946Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
