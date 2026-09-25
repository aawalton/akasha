import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithAPastParticipleAndAPreposition = {
  id: "01a0d896-be0d-7a3f-978d-33e88280c0ab",
  type: "page-type/construction",
  slug: "be-verb-with-a-past-participle-and-a-preposition",
  definition: "a verb phrase written from a form of be, what was done and a preposition",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/be-verb",
    "part-of-speech/past-participle",
    "part-of-speech/preposition",
  ],
  admits: ["the commit a website was built from", "the commit a website is built from"],
  refuses: ["a website was built from"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The preposition takes the noun the clause is about, which comes before the clause.",
    },
  ],
} as const satisfies Construction
