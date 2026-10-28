import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const familyRelative = {
  id: "01a183ad-9231-7b82-bed7-301208c0811a",
  type: "page-type/select-property",
  slug: "family-relative",
  propertySlug: "relative",
  definition: "how a relative in a person's family history is related to that person",
  values: [
    "father",
    "mother",
    "brother",
    "sister",
    "paternal-grandfather",
    "paternal-grandmother",
    "maternal-grandfather",
    "maternal-grandmother",
  ],
  types: "ts",
  createdAt: "2026-10-28T18:02:32.879Z",
  updatedAt: "2026-10-28T18:02:32.879Z",
} as const satisfies SelectProperty
