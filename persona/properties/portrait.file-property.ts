import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const portrait = {
  id: "01a05343-1f4b-7657-b8ad-2001d5112708",
  type: "page-type/file-property",
  slug: "portrait",
  propertySlug: "portrait",
  definition: "who a persona is, written in her own voice",
  extensions: ["md"],
  types: "ts",
} as const satisfies FileProperty
