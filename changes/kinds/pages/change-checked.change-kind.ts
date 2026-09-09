import type { ChangeKind } from "../change-kind.page-type.ts"

export const changeChecked = {
  id: "01a0725c-56f6-7761-b210-d08f0ff70c22",
  pageTypeSlug: "change-kind",
  type: "change-kind",
  slug: "change-checked",
  definition: "a change a program composed and the checks judge",
  pluralSlug: "change-checked",
  runsChecks: true,
  writerOwesReading: false,
  readersOweReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checked change is composed by a program rather than by an agent.",
    },
    {
      invariantKind: "departure",
      statement: "No reading is owed for a change no agent composed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fault a checked change lands is a fault in the program that composed the change.",
    },
    {
      invariantKind: "departure",
      statement: "A check refusing a checked change refuses the whole act.",
    },
    {
      invariantKind: "departure",
      statement: "A program whose change the checks refuse is mended rather than exempted.",
    },
  ],
} as const satisfies ChangeKind
