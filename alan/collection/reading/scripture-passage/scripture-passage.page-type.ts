import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const scripturePassage = {
  id: "01a0658d-fe50-7005-97df-2bbcb319b080",
  type: "page-type/page-type",
  slug: "scripture-passage",
  definition: "a chapter of scripture Alan reads",
  extends: ["page-type/collection"],
  parts: ["file-property/passage-text", "select-property/scripture-translation"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/external-id", required: false, many: false },
    { pageProperty: "select-property/scripture-translation", required: false, many: false },
    { pageProperty: "file-property/passage-text", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage names its book of scripture as a collection the passage is part of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage's verses are a file beside the passage's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage catalogued before its verses arrive has no file yet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A passage names a rendering only where the record the passage came from names a rendering.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage sits in a folder of its own named for the passage's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A passage opening its name with a chapter number is slugged for its page type first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage takes its unit from its kind rather than stating a unit of its own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
