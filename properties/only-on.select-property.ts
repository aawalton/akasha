import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const onlyOn = {
  id: "01a06861-49aa-75eb-b571-52f5d1081aa3",
  type: "page-type/select-property",
  slug: "only-on",
  propertySlug: "only-on",
  definition: "the kind of machine holding the file",
  values: ["linux", "macos", "any"],
  types: "ts",
  createdAt: "2026-09-03T17:46:41.450Z",
  updatedAt: "2026-09-25T14:53:26.000Z",
} as const satisfies SelectProperty
