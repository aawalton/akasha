import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const term = {
  id: "01a081e9-9784-7d46-ac3d-c0dd6d88cb38",
  type: "page-type/page-type",
  slug: "term",
  definition: "a word or phrase, and what that word means here",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "term" },
    { partOfSpeech: "part-of-speech/noun", spelling: "terms" },
  ],
  parts: [
    "page-type/allowed-term",
    "page-type/banned-term",
    "page-type/common-language-term",
    "page-type/foreign-name-term",
    "text-property/spelling",
    "text-property/variants",
    "record-property/spellings",
  ],
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/spelling", required: false, many: false },
    { pageProperty: "text-property/variants", required: false, many: true, maxCount: null },
    { pageProperty: "standard-agent-english-property/definition", required: false, many: false },
    { pageProperty: "record-property/spellings", required: false, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain name is defined on the domain page.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A page address is defined in the page address system.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A common language term is defined on a page of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foreign name is defined on a page of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word and that word's variants are one term.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two spellings that differ only by grammar are variants.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A term is written under its plainest spelling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A term TypeScript keeps the spelling of is written under that spelling with its type in front.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A term departing from the ordinary sense is a domain, and a domain states its definition.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
