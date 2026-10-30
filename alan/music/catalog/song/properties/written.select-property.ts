import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const written = {
  id: "01a06243-144b-7009-8017-c942088ed2c7",
  type: "page-type/select-property",
  slug: "written",
  propertySlug: "written",
  definition: "whether a song's artist has written that song without other people",
  values: ["solo", "collab"],
  types: "ts",
  createdAt: "2026-09-02T13:15:58.411Z",
  updatedAt: "2026-10-30T16:21:48.885Z",
} as const satisfies SelectProperty
