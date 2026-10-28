import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const seatbeltUse = {
  id: "01a18411-4183-7e8d-9d67-fc6f5d1aea92",
  type: "page-type/select-property",
  slug: "seatbelt-use",
  propertySlug: "seatbelt-use",
  definition: "whether a person wears a seatbelt on every car trip",
  values: ["always", "not-always"],
  types: "ts",
  createdAt: "2026-10-28T19:51:25.825Z",
  updatedAt: "2026-10-28T19:51:25.825Z",
} as const satisfies SelectProperty
