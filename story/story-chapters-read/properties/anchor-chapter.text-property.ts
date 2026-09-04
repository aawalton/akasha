import type { TextProperty } from "@akasha/pages-system/text-property"

export type AnchorChapter = string

export const anchorChapter = {
  id: "01a0685e-ef8a-758d-9ac0-c030fc9435a3",
  pageTypeSlug: "text-property",
  slug: "anchor-chapter",
  propertySlug: "chapter",
  definition: "the chapter the dating words stand in",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
