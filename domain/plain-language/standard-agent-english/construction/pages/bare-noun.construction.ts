import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const bareNoun = {
  id: "01a0c57b-3cf2-71e2-96ca-ef11ec720706",
  type: "page-type/construction",
  slug: "bare-noun",
  definition: "a noun run written from one noun and nothing else",
  phraseKind: "phrase-kind/noun-run",
  writtenFrom: ["part-of-speech/noun"],
  admits: ["markdown", "arousal", "code"],
  refuses: ["the code", "versioned text"],
} as const satisfies Construction
