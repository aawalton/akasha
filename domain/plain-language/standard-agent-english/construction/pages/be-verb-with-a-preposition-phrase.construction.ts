import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithAPrepositionPhrase = {
  id: "01a18d96-536a-7c9d-b4c5-4f3d05961828",
  type: "page-type/construction",
  slug: "be-verb-with-a-preposition-phrase",
  definition:
    "a verb phrase written from a form of be and a preposition phrase saying where the subject is",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/be-verb", "phrase-kind/preposition-phrase"],
  admits: ["a time that is behind UTC", "how far New York is behind UTC"],
  refuses: ["behind UTC is", "a time that is behind"],
  createdAt: "2026-10-30T16:13:21.640Z",
  updatedAt: "2026-10-30T16:13:21.640Z",
} as const satisfies Construction
