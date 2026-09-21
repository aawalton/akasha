import type { PhraseKind } from "akasha/domain/standard-agent-english/phrase-kind/phrase-kind.page-type.types.ts"

export const nounRun = {
  id: "01a0c61f-fd05-7af5-b494-15e0c3ced279",
  type: "page-type/phrase-kind",
  slug: "noun-run",
  definition: "one noun with the nouns before it saying what sort of thing that noun is",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The last noun of a noun run is the thing, and the nouns before it say its sort.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A noun run takes no adjective, so no adjective is written between two nouns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A noun run is read to the right, so the nouns before the last are read as one.",
    },
  ],
} as const satisfies PhraseKind
