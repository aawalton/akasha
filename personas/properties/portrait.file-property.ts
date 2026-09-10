import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Portrait = "md"

export const portrait = {
  id: "01a05343-1f4b-7657-b8ad-2001d5112708",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "portrait",
  propertySlug: "portrait",
  definition: "who a persona is, written in her own voice",
} as const satisfies FileProperty
