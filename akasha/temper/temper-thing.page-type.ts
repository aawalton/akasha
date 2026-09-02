import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Description } from "./properties/description.text-property.ts"
import type { DisplayOrder } from "./properties/display-order.number-property.ts"
import type { Icon } from "./properties/icon.text-property.ts"
import type { Key } from "./properties/key.text-property.ts"
import type { Title } from "./properties/title.text-property.ts"

export type TemperThing = Page & {
  title: Title
  key?: Key
  description?: Description
  icon?: Icon
  displayOrder?: DisplayOrder
}

export const temperThing = {
  id: "01a05fb0-3ce8-72d1-bc97-7c0f7f1810b3",
  pageTypeSlug: "page-type",
  slug: "temper-thing",
  definition: "anything temper keeps a page for",
  pluralSlug: "temper-things",
  extendsSlug: "page-type/page",
  partSlugs: [
    "number-property/display-order",
    "text-property/description",
    "text-property/icon",
    "text-property/key",
    "text-property/title",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "key", required: false, many: false },
    { pagePropertySlug: "description", required: false, many: false },
    { pagePropertySlug: "icon", required: false, many: false },
    { pagePropertySlug: "display-order", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page type temper carries extends this one or a page type extending it.",
    },
    {
      invariantKind: "departure",
      statement: "A title is the one property every page temper keeps must state.",
    },
  ],
} as const satisfies PageType
