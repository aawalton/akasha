import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const possessiveNounRun = {
  id: "01a0c931-ef71-74f5-adf2-95deb30632f0",
  type: "page-type/construction",
  slug: "possessive-noun-run",
  definition: "a noun phrase written from a noun run, a possessive clitic and the noun group owned",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/possessive-clitic",
    "phrase-kind/noun-group",
  ],
  admits: ["page's data", "show's episodes"],
  refuses: ["Alan's", "'s mailbox", "the shape of a page's data"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What owns is a noun run rather than a noun phrase, so no phrase here is read two ways.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A possessor holding a preposition phrase would let the mark close a longer phrase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is owned takes no determiner, the mark sitting where a determiner would.",
    },
  ],
} as const satisfies Construction
