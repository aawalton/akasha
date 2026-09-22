import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const proof = {
  id: "01a0657f-5da8-7d50-9da8-5ad4177c9541",
  type: "page-type/page-type",
  slug: "proof",
  definition: "an attempt at deriving a proposition in the formal system",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "proof" }],
  extends: ["page-type/page"],
  parts: [
    "file-property/derivation",
    "number-property/attempt",
    "relation-property/proves",
    "select-property/proof-status",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/proves", required: true, many: false },
    { pageProperty: "select-property/proof-status", required: true, many: false },
    { pageProperty: "number-property/attempt", required: true, many: false },
    { pageProperty: "file-property/derivation", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A proof names the proposition the proof attempts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second attempt at one proposition is a second proof rather than an edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A proof's derivation is in a file of the derivation's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A derivation justifies every line the derivation numbers.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
