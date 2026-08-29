import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Evidence = string

export const evidence = {
  id: "01a04bc5-f8c4-74fd-91a4-a520d1ea6245",
  pageTypeSlug: "page-property-type",
  slug: "evidence",
  definition: "the observations a claim rests on",
  extendsSlug: null,
  kind: "text",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies PagePropertyType
