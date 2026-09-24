import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const possessiveProperNoun = {
  id: "01a0d484-15a4-77a3-860d-faf2687ae60a",
  type: "page-type/construction",
  slug: "possessive-proper-noun",
  definition:
    "a noun phrase written from a proper noun, a possessive clitic and the noun group owned",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/proper-noun",
    "part-of-speech/possessive-clitic",
    "phrase-kind/noun-group",
  ],
  admits: ["Alan's life", "Alan's mailbox", "Claude Code's config"],
  refuses: ["the Alan's life", "Alan's"],
} as const satisfies Construction
