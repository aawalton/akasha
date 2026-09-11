import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const written = {
  id: "01a06243-144b-7009-8017-c942088ed2c7",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "written",
  propertySlug: "written",
  definition: "whether the artist wrote the song alone or with others",
  values: ["solo", "collab"],
  types: "ts",
} as const satisfies SelectProperty
