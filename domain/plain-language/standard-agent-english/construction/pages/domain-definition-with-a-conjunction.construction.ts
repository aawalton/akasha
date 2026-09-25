import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const domainDefinitionWithAConjunction = {
  id: "01a0c617-c18d-7c76-9c87-57bd9c9b5235",
  type: "page-type/construction",
  slug: "domain-definition-with-a-conjunction",
  definition: "a domain definition written from two noun phrases a conjunction joins",
  phraseKind: "phrase-kind/domain-definition",
  writtenFrom: ["phrase-kind/noun-phrase", "part-of-speech/conjunction", "phrase-kind/noun-phrase"],
  admits: ["a page and a file", "the words of a song or the shape of the body"],
  refuses: ["the page and the file and the row", "and a file"],
} as const satisfies Construction
