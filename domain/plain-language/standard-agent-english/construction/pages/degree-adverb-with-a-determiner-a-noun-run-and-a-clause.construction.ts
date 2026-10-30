import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const degreeAdverbWithADeterminerANounRunAndAClause = {
  id: "01a18dbe-e385-78b5-b4a5-01521b305d23",
  type: "page-type/construction",
  slug: "degree-adverb-with-a-determiner-a-noun-run-and-a-clause",
  definition: "a noun phrase written from a degree adverb, a determiner, a noun run and a clause",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/degree-adverb",
    "part-of-speech/determiner",
    "phrase-kind/noun-run",
    "part-of-speech/determiner",
    "phrase-kind/noun-group",
    "part-of-speech/verb",
  ],
  admits: [
    "how much difference this person makes",
    "how much care a relationship topic needs",
    "how many failures a sync run has",
  ],
  refuses: [
    "how much difference this person",
    "how much difference makes this person",
    "how much difference Alan makes",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The noun run is what the verb counts, and the clause has no object after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The clause subject states a determiner of its own, so no proper noun is the subject here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One verb ends the clause, so nothing is read after the verb.",
    },
  ],
  createdAt: "2026-10-30T16:57:39.971Z",
  updatedAt: "2026-10-30T16:57:39.971Z",
} as const satisfies Construction
