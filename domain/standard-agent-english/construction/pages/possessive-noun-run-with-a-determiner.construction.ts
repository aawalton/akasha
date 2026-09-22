import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const possessiveNounRunWithADeterminer = {
  id: "01a0c932-0974-771f-b07a-c900f1a63592",
  type: "page-type/construction",
  slug: "possessive-noun-run-with-a-determiner",
  definition: "a noun phrase whose owner is a determiner and a noun run",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/determiner",
    "phrase-kind/noun-run",
    "part-of-speech/possessive-clitic",
    "phrase-kind/noun-group",
  ],
  admits: ["the library's page", "a show's episodes", "the household's money"],
  refuses: ["the library's", "the the library's page"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The determiner names what owns rather than what is owned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A noun phrase written this way takes no second determiner before it.",
    },
  ],
} as const satisfies Construction
