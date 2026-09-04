import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Hex } from "./properties/hex.text-property.ts"

export type Color = Page & {
  title: Title
  hex?: Hex
}

export const color = {
  id: "01a06575-c2a9-766f-8f09-da30cc969637",
  pageTypeSlug: "page-type",
  slug: "color",
  definition: "one color anything can be drawn in",
  pluralSlug: "colors",
  extendsSlug: "page-type/page",
  partSlugs: ["text-property/hex"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "hex", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A color is named rather than specified, and whatever draws it picks the shade from its own palette.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each hex here is a gemstone shade standing under a plain name rather than the gemstone's.",
    },
    {
      invariantKind: "departure",
      statement: "A color stating no hex is drawn in whatever text color the reader already has.",
    },
  ],
} as const satisfies PageType
