import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const verbWithAStrandedPreposition = {
  id: "01a15598-3bb4-7cb6-9509-4fe600b15e56",
  type: "page-type/construction",
  slug: "verb-with-a-stranded-preposition",
  definition:
    "a verb phrase written from a verb and a preposition whose noun phrase sits before the clause",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/verb", "part-of-speech/preposition"],
  admits: ["waits on", "runs at", "starts with"],
  refuses: ["on waits", "waits on on"],
  createdAt: "2026-10-19T19:16:42.547Z",
  updatedAt: "2026-10-19T19:16:42.547Z",
} as const satisfies Construction
