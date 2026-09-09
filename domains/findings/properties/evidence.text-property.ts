import type { TextProperty } from "@akasha/pages/text-property"

export type Evidence = string

export const evidence = {
  id: "01a04bc5-f8c4-74fd-91a4-a520d1ea6245",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "evidence",
  propertySlug: "evidence",
  definition: "the observations a claim rests on",
  maxLength: 6000,
  nameFormat: null,
} as const satisfies TextProperty
