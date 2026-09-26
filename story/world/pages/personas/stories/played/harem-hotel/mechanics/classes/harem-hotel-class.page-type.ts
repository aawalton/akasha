import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const haremHotelClass = {
  id: "01a0de51-b972-7e50-a28d-49e039320ff6",
  type: "page-type/page-type",
  slug: "harem-hotel-class",
  definition: "the class one character in the Harem Hotel holds",
  pluralSlug: "classes",
  extends: ["page-type/world-class"],
  parts: [
    "relation-property/harem-hotel-class-character",
    "relation-property/harem-hotel-class-class",
  ],
  properties: [
    { pageProperty: "relation-property/harem-hotel-class-character", required: true, many: false },
    { pageProperty: "relation-property/harem-hotel-class-class", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A class in the Harem Hotel is won in play rather than given at the start.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character holding no class is in the ordinary state rather than in error.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
