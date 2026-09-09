import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Hex } from "./properties/hex.text-property.ts"

export type Color = Page & {
  title: Title
  hex?: Hex
}

export const color = {
  id: "01a06575-c2a9-766f-8f09-da30cc969637",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "color",
  definition: "one color anything can be drawn in",
  pluralSlug: "colors",
  extends: ["page-type/page"],
  parts: ["text-property/hex"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/hex", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A color is named rather than specified.",
    },
    {
      invariantKind: "departure",
      statement: "Whatever draws the color picks the shade from its own palette.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each hex here is a shade the palette draws, under a plain name rather than the source's.",
    },
    {
      invariantKind: "departure",
      statement: "The neutrals run from soot up to chalk, and grey sits between stone and silver.",
    },
    {
      invariantKind: "departure",
      statement: "A color stating no hex is drawn in whatever text color the reader already has.",
    },
  ],
} as const satisfies PageType
