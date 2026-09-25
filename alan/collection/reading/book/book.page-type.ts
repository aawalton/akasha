import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const book = {
  id: "01a06598-222b-7002-9769-8ec160210422",
  type: "page-type/page-type",
  slug: "book",
  definition: "a book Alan reads",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "book" },
    { partOfSpeech: "part-of-speech/noun", spelling: "books" },
  ],
  extends: ["page-type/collection-external"],
  parts: [
    "number-property/original-publication-year",
    "number-property/page-count",
    "number-property/rating",
    "text-property/isbn",
    "text-property/isbn13",
    "text-property/publisher",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/isbn", required: false, many: false },
    { pageProperty: "text-property/isbn13", required: false, many: false },
    { pageProperty: "text-property/publisher", required: false, many: false },
    { pageProperty: "number-property/original-publication-year", required: false, many: false },
    { pageProperty: "number-property/rating", required: false, many: false },
    { pageProperty: "number-property/page-count", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A book's own length is counted in the words the book runs to.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A book names the author as the author is written rather than as a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book states which instalment of its series the book is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book names every series the book is an instalment of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book Alan has not graded states no rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book opening its name with a number is slugged for its page type first.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
