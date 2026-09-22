import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const nounWithANounRun = {
  id: "01a0c620-5515-7a60-90a8-f4786eeb2912",
  type: "page-type/construction",
  slug: "noun-with-a-noun-run",
  definition: "a noun run written from a noun and the noun run whose sort that noun says",
  phraseKind: "phrase-kind/noun-run",
  writtenFrom: ["part-of-speech/noun", "phrase-kind/noun-run"],
  admits: ["page property", "email address", "skill point window"],
  refuses: ["page whole file", "property the page"],
} as const satisfies Construction
