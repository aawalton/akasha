import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const styleRule = {
  id: "01a0de9c-aef3-72c2-8506-f0ac609c48ea",
  type: "page-type/page-type",
  slug: "style-rule",
  definition: "a rule for how narrative prose reads",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "style rule" },
    { partOfSpeech: "part-of-speech/noun", spelling: "style rules" },
  ],
  pluralSlug: "style-rules",
  extends: ["page-type/page"],
  parts: [
    "text-property/style-rule-name",
    "standard-agent-english-property/style-rule-act",
    "standard-agent-english-property/style-rule-warrant",
    "standard-agent-english-property/style-rule-aids",
    "record-property/style-examples",
    "text-property/style-example-before",
    "text-property/style-example-after",
  ],
  properties: [
    { pageProperty: "text-property/style-rule-name", required: true, many: false },
    { pageProperty: "standard-agent-english-property/style-rule-act", required: true, many: false },
    {
      pageProperty: "standard-agent-english-property/style-rule-warrant",
      required: true,
      many: false,
    },
    {
      pageProperty: "standard-agent-english-property/style-rule-aids",
      required: false,
      many: true,
      maxCount: 10,
    },
    {
      pageProperty: "record-property/style-examples",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A style rule under this folder holds for all narrative.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn's prose is rewritten to meet every style rule before the turn is published.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An example shows prose breaking the rule and the same prose rewritten to meet it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
