import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithANegatorAndAPastParticiple = {
  id: "01a18d6d-e8e5-7462-ac8b-fdc24ef503af",
  type: "page-type/construction",
  slug: "be-verb-with-a-negator-and-a-past-participle",
  definition: "a verb phrase written from a form of be, a negator, and what was not done",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/be-verb",
    "part-of-speech/negator",
    "part-of-speech/past-participle",
  ],
  admits: ["a page that is not done", "whether a page is not done", "is not kept"],
  refuses: ["is done not", "not is done", "is not"],
  createdAt: "2026-10-30T15:29:12.932Z",
  updatedAt: "2026-10-30T15:29:12.932Z",
} as const satisfies Construction
