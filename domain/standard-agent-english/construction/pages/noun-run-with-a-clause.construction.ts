import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithAClause = {
  id: "01a0c67a-50ad-7181-9d2e-827c9c7d8f18",
  type: "page-type/construction",
  slug: "noun-run-with-a-clause",
  definition: "a noun group written from a noun run and a clause saying what is done to it",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/determiner",
    "phrase-kind/noun-group",
    "part-of-speech/verb",
  ],
  admits: ["the code a machine runs", "the text an agent reads", "a dish a restaurant serves"],
  refuses: ["the code machine runs", "the code a machine"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The clause subject states a determiner of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That determiner is what says where the noun run ends, so no phrase here is read two ways.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The determiner before the whole is written by the noun phrase rather than here.",
    },
  ],
} as const satisfies Construction
