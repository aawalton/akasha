import type { ChangeKind } from "akasha/change/kind/change-kind.page-type.types.ts"

export const changeChecked = {
  id: "01a0725c-56f6-7761-b210-d08f0ff70c22",
  type: "page-type/change-kind",
  slug: "change-checked",
  definition: "a change made by a program for the checks to judge",
  runsChecks: true,
  writerOwesReading: false,
  readersOweReading: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A checked change is composed by a program rather than by an agent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No reading is owed for a change no agent composed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fault a checked change lands is a fault in the program that composed the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check refusing a checked change refuses the whole act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A program whose change the checks refuse is mended rather than exempted.",
    },
  ],
  createdAt: "2026-09-05T16:17:29.334Z",
  updatedAt: "2026-10-30T17:06:11.691Z",
} as const satisfies ChangeKind
