import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const tabooTerm = {
  id: "01a0592c-2737-7057-aa66-a46141334052",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "taboo-term",
  definition: "a word this system never writes in the senses it bars",
  pluralSlug: "taboo-terms",
  parts: [
    "record-property/taboo-senses",
    "text-property/kept-senses",
    "text-property/pattern",
    "text-property/sense",
  ],
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/pattern", required: true, many: false },
    {
      pageProperty: "record-property/taboo-senses",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "text-property/kept-senses", required: false, many: true, maxCount: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A taboo term is keyed by the word the taboo term bars.",
    },
    {
      invariantKind: "departure",
      statement: "The word is written wherever the word has a sense the term does not bar.",
    },
    {
      invariantKind: "departure",
      statement: "A term names the senses the term keeps as well as the senses the term bars.",
    },
    {
      invariantKind: "departure",
      statement: "A term naming no kept sense permits every other sense by omission alone.",
    },
    {
      invariantKind: "departure",
      statement: "A sense a term bars was written here before the sense was barred.",
    },
    {
      invariantKind: "departure",
      statement: "A taboo term is found by its pattern rather than by its slug.",
    },
    {
      invariantKind: "absence",
      statement: "A taboo term states no warrant for what the taboo term bars.",
    },
    {
      invariantKind: "departure",
      statement: "A change adding text a pattern finds is refused until that term has been read.",
    },
    {
      invariantKind: "departure",
      statement: "A term reaches inside a camelCase name.",
    },
  ],
  types: "ts",
} as const satisfies PageType
