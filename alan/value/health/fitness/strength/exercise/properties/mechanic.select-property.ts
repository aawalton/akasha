import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const mechanic = {
  id: "01a0657e-2bbf-7358-a603-36a24d364e4e",
  type: "page-type/select-property",
  slug: "mechanic",
  propertySlug: "mechanic",
  definition: "whether a strength exercise moves at least two joints",
  values: ["compound", "isolation"],
  types: "ts",
  createdAt: "2026-09-03T04:19:22.687Z",
  updatedAt: "2026-10-30T16:51:33.397Z",
} as const satisfies SelectProperty
