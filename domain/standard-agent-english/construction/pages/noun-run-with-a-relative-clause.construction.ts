import type { Construction } from "akasha/domain/standard-agent-english/construction/construction.page-type.types.ts"

export const nounRunWithARelativeClause = {
  id: "01a0d429-c1c7-72c4-8331-62f1feb4cd39",
  type: "page-type/construction",
  slug: "noun-run-with-a-relative-clause",
  definition: "a noun group written from a noun run and a clause that relative pronoun opens",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: [
    "phrase-kind/noun-run",
    "part-of-speech/relative-pronoun",
    "phrase-kind/verb-phrase",
  ],
  admits: ["process that runs a seat's agent", "page that holds a value", "seat that reads a page"],
  refuses: ["that runs a seat's agent", "process that"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The relative pronoun is the subject of the clause it opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A clause whose subject is another noun is written by the construction with no pronoun.",
    },
  ],
} as const satisfies Construction
