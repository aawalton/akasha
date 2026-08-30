import type { FileProperty } from "../../../pages-system/file-property/file-property.page-type.ts"

export type Portrait = "md"

export const portrait = {
  id: "01a05343-1f4b-7657-b8ad-2001d5112708",
  pageTypeSlug: "file-property",
  slug: "portrait",
  definition: "who a persona is, written in her own voice",
} as const satisfies FileProperty
