import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithAPastParticipleAndAPrepositionPhrase = {
  id: "01a0d5bc-0c3e-7299-930c-48d65ab2f869",
  type: "page-type/construction",
  slug: "be-verb-with-a-past-participle-and-a-preposition-phrase",
  definition: "a verb phrase written from a form of be, what was done and a preposition phrase",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/be-verb",
    "part-of-speech/past-participle",
    "phrase-kind/preposition-phrase",
  ],
  admits: ["are found by name", "is stored in a folder"],
  refuses: ["are by name found", "are found by"],
} as const satisfies Construction
