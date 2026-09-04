import type { FileProperty } from "@akasha/pages-system/file-property"

export type WordPieces = "json"

export const wordPieces = {
  id: "01a06d3b-743f-7c80-b8f3-a929faae24ed",
  pageTypeSlug: "file-property",
  slug: "word-pieces",
  propertySlug: "word-pieces",
  definition: "the pieces a word is encoded against",
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
