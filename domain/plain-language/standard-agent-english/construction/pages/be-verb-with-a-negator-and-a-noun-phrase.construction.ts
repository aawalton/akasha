import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithANegatorAndANounPhrase = {
  id: "01a0d987-dcb1-79e7-802f-72d5dcd8b881",
  type: "page-type/construction",
  slug: "be-verb-with-a-negator-and-a-noun-phrase",
  definition:
    "a verb phrase written from a form of be, a word that negates it, and what the subject is not",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/be-verb", "part-of-speech/negator", "phrase-kind/noun-phrase"],
  admits: ["is not part of akasha", "is not a domain"],
  refuses: ["not is a domain", "is a domain not"],
} as const satisfies Construction
