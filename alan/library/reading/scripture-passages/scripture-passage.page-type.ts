import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const scripturePassage = {
  id: "01a0658d-fe50-7005-97df-2bbcb319b080",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "scripture-passage",
  definition: "one chapter of scripture Alan reads",
  pluralSlug: "scripture-passages",
  extends: ["page-type/collection"],
  parts: [
    "file-property/passage-text",
    "select-property/scripture-translation",
    "text-property/scripture-book",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/external-id", required: false, many: false },
    { pageProperty: "text-property/scripture-book", required: false, many: false },
    { pageProperty: "select-property/scripture-translation", required: false, many: false },
    { pageProperty: "file-property/passage-text", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A passage names the book of scripture the passage is in.",
    },
    {
      invariantKind: "departure",
      statement: "A passage's verses are a file beside the passage's page.",
    },
    {
      invariantKind: "departure",
      statement: "A passage catalogued before its verses arrive has no file yet.",
    },
    {
      invariantKind: "departure",
      statement:
        "A passage names a rendering only where the record the passage came from names a rendering.",
    },
    {
      invariantKind: "departure",
      statement: "A passage sits in the folder named for the book of scripture the passage is in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A passage opening its name with a chapter number is slugged for its page type first.",
    },
    {
      invariantKind: "departure",
      statement: "A passage takes its unit from its kind rather than stating a unit of its own.",
    },
    {
      invariantKind: "gap",
      statement: "The collection a passage is part of is no page.",
    },
  ],
  types: "ts",
} as const satisfies PageType
