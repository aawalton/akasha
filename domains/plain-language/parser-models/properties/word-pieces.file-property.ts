import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type WordPieces = "json"

export const wordPieces = {
  id: "01a06d3b-743f-7c80-b8f3-a929faae24ed",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "word-pieces",
  propertySlug: "word-pieces",
  definition: "the pieces a word is encoded against",
  generated: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The trained model knows each piece by a number.",
    },
    {
      invariantKind: "departure",
      statement: "The pieces are kept outside the commit.",
    },
  ],
} as const satisfies FileProperty
