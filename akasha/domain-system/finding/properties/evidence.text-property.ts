import type { TextProperty } from "../../../pages-system/page-property/text-property.page-type.ts"

export type Evidence = string

export const evidence = {
  id: "01a04bc5-f8c4-74fd-91a4-a520d1ea6245",
  pageTypeSlug: "text-property",
  slug: "evidence",
  definition: "the observations a claim rests on",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
