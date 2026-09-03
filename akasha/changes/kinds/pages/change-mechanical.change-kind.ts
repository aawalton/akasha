import type { ChangeKind } from "../change-kind.page-type.ts"

export const changeMechanical = {
  id: "01a05df1-e262-72e3-8f24-d6e5e4ed122d",
  pageTypeSlug: "change-kind",
  slug: "change-mechanical",
  definition: "a change composed by a program",
  runsChecks: false,
  runsWarrants: false,
  invariants: [
    {
      invariantKind: "absence",
      statement: "A mechanical change is not shown to Alan line by line.",
    },
    {
      invariantKind: "absence",
      statement: "A mechanical change does not rewrite authored prose.",
    },

    {
      invariantKind: "departure",
      statement:
        "A fault a mechanical change lands is a fault in the program that composed the change.",
    },
    {
      invariantKind: "departure",
      statement: "A fault the audit finds is repaired rather than undone.",
    },
    {
      invariantKind: "gap",
      statement: "A fault a mechanical change lands is found by the audit.",
    },
  ],
} as const satisfies ChangeKind
