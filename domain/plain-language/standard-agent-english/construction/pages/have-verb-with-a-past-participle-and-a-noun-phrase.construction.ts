import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const haveVerbWithAPastParticipleAndANounPhrase = {
  id: "01a18d70-5d17-7537-aea2-d76a10448e19",
  type: "page-type/construction",
  slug: "have-verb-with-a-past-participle-and-a-noun-phrase",
  definition:
    "a verb phrase written from a form of have, what was done, and the noun phrase it was done to",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/have-verb",
    "part-of-speech/past-participle",
    "phrase-kind/noun-phrase",
  ],
  admits: ["whether Alan has solved a puzzle", "has used a page"],
  refuses: ["has a puzzle solved", "solved has a puzzle"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A form of have and a past participle with nothing after them is not written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That shorter phrase reads a word that is both a noun and a past participle two ways.",
    },
  ],
  createdAt: "2026-10-30T15:31:53.748Z",
  updatedAt: "2026-10-30T15:31:53.748Z",
} as const satisfies Construction
