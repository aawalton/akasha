import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const wordPieces = {
  id: "01a06d3b-743f-7c80-b8f3-a929faae24ed",
  type: "page-type/file-property",
  slug: "word-pieces",
  propertySlug: "word-pieces",
  definition: "the pieces encoding a word",
  extensions: ["json"],
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The trained model knows each piece by a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pieces are kept outside the commit.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
