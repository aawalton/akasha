import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const refusal = {
  id: "01a0699d-4000-7a11-9c02-3f61b0d24e77",
  type: "page-type/page-type",
  slug: "refusal",
  definition: "the words printed when an instrument refuses",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "refusal" },
    { partOfSpeech: "part-of-speech/noun", spelling: "refusals" },
  ],
  extends: ["page-type/page"],
  mortal: true,
  parts: ["text-property/refusal-text"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/refusal-text", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is words to print and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal goes when the instrument printing that refusal goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hole marked in the text is filled by the instrument printing the refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The holes a refusal marks are read off the refusal's own text rather than listed beside that text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One refusal is printed at more than one place.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
