import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const color = {
  id: "01a06575-c2a9-766f-8f09-da30cc969637",
  type: "page-type/page-type",
  slug: "color",
  definition: "one color anything can be drawn in",
  extends: ["page-type/page"],
  parts: ["text-property/hex"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/hex", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A color is named rather than specified.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whatever draws the color picks the shade from its own palette.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each hex here is a shade the palette draws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hex here has a plain name rather than the source's name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The neutrals run from soot up to chalk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Grey sits between stone and silver.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A color stating no hex is drawn in whatever text color the reader already has.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
