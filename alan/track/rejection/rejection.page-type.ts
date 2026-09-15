import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const rejection = {
  id: "01a0a69b-59a5-7703-b20b-4bc445481cac",
  type: "page-type/page-type",
  slug: "rejection",
  definition: "one time Alan put himself where the answer could be no",
  extends: ["page-type/page"],
  parts: ["boolean-property/rejected"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "instant-property/happened-at", required: true, many: false },
    { pageProperty: "boolean-property/rejected", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One file has one time Alan risked a no.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The day a rejection counts to is worked out from the instant that rejection happened at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A risk Alan took and a no Alan got are one page rather than two.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here turns a rejection into points.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
