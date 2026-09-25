import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const properNounWithANounRun = {
  id: "01a0d484-0a9e-7ca8-99aa-f79fb48fe022",
  type: "page-type/construction",
  slug: "proper-noun-with-a-noun-run",
  definition:
    "a noun run written from a proper noun and the noun run whose sort that proper noun says",
  phraseKind: "phrase-kind/noun-run",
  writtenFrom: ["part-of-speech/proper-noun", "phrase-kind/noun-run"],
  admits: ["Claude Code app", "Claude Code config", "Anthropic account"],
  refuses: ["app Claude Code", "Alan Claude Code"],
} as const satisfies Construction
