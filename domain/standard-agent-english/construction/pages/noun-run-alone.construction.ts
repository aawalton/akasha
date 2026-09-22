import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunAlone = {
  id: "01a0c620-6a9c-787c-8e9b-8cbfd5e20a22",
  type: "page-type/construction",
  slug: "noun-run-alone",
  definition: "a noun group written from a noun run and nothing else",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: ["phrase-kind/noun-run"],
  admits: ["page property", "code"],
  refuses: ["the page property", "whole page property"],
} as const satisfies Construction
