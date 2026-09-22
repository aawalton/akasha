import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const verbWithANounPhrase = {
  id: "01a0ca51-817d-7cab-945d-077f7d12ffff",
  type: "page-type/construction",
  slug: "verb-with-a-noun-phrase",
  definition: "a verb phrase written from a verb and the noun phrase that verb acts on",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/verb", "phrase-kind/noun-phrase"],
  admits: ["reads a page", "runs a program", "has a name"],
  refuses: ["a page reads", "reads a"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The noun phrase here states a determiner of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verb acting on nothing is written by the verb alone rather than here.",
    },
  ],
} as const satisfies Construction
