import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Definition = string

export const definition = {
  id: "01a049b9-856c-70ca-bfd8-31cb76ead837",
  slug: "definition",
  definition: "the sentence naming what a page's subject is",
  extendsSlug: null,
  type: "text",
  max: 100,
  nameFormatSlug: null,
  design: [
    "A definition holds no clause saying what the thing is for, why it is worth having, or where it sits.",
    "A definition names one concern. Where a second is needed to cover the area, the area is more than one domain.",
    "A fact true of every sibling stands on the parent's line rather than on each sibling's own line.",
    "What a domain is about stays on its own line, even where every sibling is about it too.",
  ],
} as const satisfies PagePropertyType
