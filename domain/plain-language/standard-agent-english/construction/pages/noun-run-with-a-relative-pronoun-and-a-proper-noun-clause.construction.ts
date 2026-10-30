import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithARelativePronounAndAProperNounClause = {
  id: "01a18d85-4352-7841-b9a7-6e8fa8e2c80a",
  type: "page-type/construction",
  slug: "noun-run-with-a-relative-pronoun-and-a-proper-noun-clause",
  definition:
    "a noun group written from a noun run, a relative pronoun and a clause a proper noun opens",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/relative-pronoun",
    "part-of-speech/proper-noun",
    "phrase-kind/verb-phrase",
  ],
  admits: ["a program that Claude Code does not wait for", "a program that Claude Code waits for"],
  refuses: ["a program that Claude Code", "a program Claude Code that waits for"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The proper noun is the subject, and the noun run is what the clause acts on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A clause a noun phrase opens after the pronoun reads many phrases two ways, so it is not written.",
    },
  ],
  createdAt: "2026-10-30T15:54:43.407Z",
  updatedAt: "2026-10-30T15:54:43.407Z",
} as const satisfies Construction
