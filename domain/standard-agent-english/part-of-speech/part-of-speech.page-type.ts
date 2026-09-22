import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partOfSpeech = {
  id: "01a0c564-e79a-7e94-a65a-e5acd2dacc9f",
  type: "page-type/page-type",
  slug: "part-of-speech",
  definition: "a job a word does in a phrase",
  parts: [
    "part-of-speech/noun",
    "relation-property/part-of-speech",
    "part-of-speech/determiner",
    "part-of-speech/preposition",
    "part-of-speech/adjective",
    "part-of-speech/conjunction",
    "part-of-speech/verb",
    "part-of-speech/free-relative-pronoun",
  ],
  extends: ["page-type/domain"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A part of speech is a job a word does rather than a sense that word has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part of speech is named here only where an admitted construction uses it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
