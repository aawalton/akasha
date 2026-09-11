import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const insights = {
  id: "01a06243-144b-700e-a1ca-924ff3e3afdf",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "insights",
  propertySlug: "insights",
  definition: "what Alan found in a song when he read it",
  extensions: ["txt"],
  types: "ts",
} as const satisfies FileProperty
