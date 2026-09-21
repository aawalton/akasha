import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const construction = {
  id: "01a0c57b-2a6d-776f-861f-adfa84782205",
  type: "page-type/page-type",
  slug: "construction",
  definition: "one way a phrase kind is written",
  parts: [
    "construction/bare-noun",
    "one-of-property/written-from",
    "relation-property/phrase-kind",
    "text-property/admits",
    "text-property/refuses",
    "construction/noun-group-alone",
    "construction/noun-group-with-a-determiner",
    "construction/preposition-with-a-noun-phrase",
    "construction/noun-run-with-a-preposition-phrase",
    "construction/domain-definition-as-a-noun-phrase",
    "construction/noun-group-with-an-adjective",
    "construction/domain-definition-with-a-conjunction",
    "construction/noun-with-a-noun-run",
    "construction/noun-run-alone",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "relation-property/phrase-kind", required: true, many: false },
    {
      pageProperty: "one-of-property/written-from",
      required: true,
      many: true,
      maxCount: null,
      repeats: true,
    },
    { pageProperty: "text-property/admits", required: true, many: true, maxCount: null },
    { pageProperty: "text-property/refuses", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A phrase kind written two ways is two constructions rather than one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A construction is here because Alan admitted it against the phrases it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A construction carries no predicate, and the grammar reads its parts in order.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
