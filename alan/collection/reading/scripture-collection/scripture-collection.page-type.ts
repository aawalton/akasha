import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const scriptureCollection = {
  id: "01a06807-be66-7003-aba8-347b1f0d9f84",
  type: "page-type/page-type",
  slug: "scripture-collection",
  definition: "a book of scripture whose chapters Alan reads",
  extends: ["page-type/collection-external"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/external-id", required: false, many: false },
    { pageProperty: "select-property/scripture-translation", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A book of scripture is named by the key its passages are reached under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A book names a rendering only where every passage in the book names that rendering.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
