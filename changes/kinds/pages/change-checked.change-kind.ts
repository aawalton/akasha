import type { ChangeKind } from "../change-kind.page-type.ts"

export const changeChecked = {
  id: "01a06057-f713-7a21-a74c-5904d2a9a33b",
  pageTypeSlug: "change-kind",
  slug: "change-checked",
  definition: "a change composed by a program and judged by the checks",
  runsChecks: true,
  runsWarrants: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checked change is judged by the checks.",
    },
    {
      invariantKind: "departure",
      statement: "A checked change owes no reading.",
    },
    {
      invariantKind: "departure",
      statement: "No record says a program read what the program composed.",
    },
    {
      invariantKind: "departure",
      statement: "A fault a checked change would land is refused at the gate.",
    },
    {
      invariantKind: "absence",
      statement: "No call names a kind.",
    },
  ],
} as const satisfies ChangeKind
