import type { PhraseKind } from "akasha/domain/standard-agent-english/phrase-kind/phrase-kind.page-type.types.ts"

export const nounGroup = {
  id: "01a0c57e-fcdb-7371-b035-b4d46532dfce",
  type: "page-type/phrase-kind",
  slug: "noun-group",
  definition: "a noun run with the words describing it, before a determiner",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A noun group takes a word describing it and never takes a determiner.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A noun group takes one preposition phrase and never two, so no phrase has a second parse.",
    },
  ],
} as const satisfies PhraseKind
