import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithAPastParticipleAndAMannerAdverb = {
  id: "01a0d8f4-3908-7119-bbaa-a40657c4b370",
  type: "page-type/construction",
  slug: "be-verb-with-a-past-participle-and-a-manner-adverb",
  definition: "a verb phrase written from a form of be, what was done, and how it was done",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/be-verb",
    "part-of-speech/past-participle",
    "part-of-speech/manner-adverb",
  ],
  admits: ["is made well", "is done well"],
  refuses: ["well is made", "is well"],
} as const satisfies Construction
