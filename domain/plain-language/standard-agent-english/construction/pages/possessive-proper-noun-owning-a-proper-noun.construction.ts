import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const possessiveProperNounOwningAProperNoun = {
  id: "01a0d571-c630-72ee-ab3f-54b0ffd7ff2b",
  type: "page-type/construction",
  slug: "possessive-proper-noun-owning-a-proper-noun",
  definition:
    "a noun phrase written from a proper noun, a possessive clitic and the proper noun owned",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/proper-noun",
    "part-of-speech/possessive-clitic",
    "part-of-speech/proper-noun",
  ],
  admits: ["Alan's Google Drive", "the files in Alan's Google Drive"],
  refuses: ["the Alan's Google Drive", "Alan's"],
} as const satisfies Construction
