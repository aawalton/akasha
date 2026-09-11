import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const wordPieces = {
  id: "01a06d3b-743f-7c80-b8f3-a929faae24ed",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "word-pieces",
  propertySlug: "word-pieces",
  definition: "the pieces a word is encoded against",
  extensions: ["json"],
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
  types: "ts",
} as const satisfies FileProperty
