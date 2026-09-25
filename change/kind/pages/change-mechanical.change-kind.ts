import type { ChangeKind } from "akasha/change/kind/change-kind.page-type.types.ts"

export const changeMechanical = {
  id: "01a05df1-e262-72e3-8f24-d6e5e4ed122d",
  type: "page-type/change-kind",
  slug: "change-mechanical",
  definition: "a change composed by a program",
  runsChecks: false,
  writerOwesReading: false,
  readersOweReading: false,
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A mechanical change is not shown to Alan line by line.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A mechanical change is not authored prose.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fault a mechanical change lands is a fault in the program that composed the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault the audit finds is repaired rather than undone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault a mechanical change lands is found by the audit.",
    },
  ],
} as const satisfies ChangeKind
