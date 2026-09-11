import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const color = {
  id: "01a06575-c2a9-766f-8f09-da30cc969637",
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
      statement: "Each hex here is a shade the palette draws.",
    },
    {
      invariantKind: "departure",
      statement: "A hex here has a plain name rather than the source's name.",
    },
    {
      invariantKind: "departure",
      statement: "The neutrals run from soot up to chalk.",
    },
    {
      invariantKind: "departure",
      statement: "Grey sits between stone and silver.",
    },
    {
      invariantKind: "departure",
      statement: "A color stating no hex is drawn in whatever text color the reader already has.",
    },
  ],
  types: "ts",
} as const satisfies PageType
