import type { Module } from "@akasha/code-system/module"

export const cli = {
  id: "01a04bdd-596d-7b27-bcc5-9acb2728eb0f",
  pageTypeSlug: "module",
  slug: "cli",
  definition: "the name on the path answered, printed and given an exit code",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command answers and this module prints.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is waited for before anything is printed.",
    },
    {
      invariantKind: "departure",
      statement: "What is printed is out before the exit code ends the process.",
    },
    {
      invariantKind: "departure",
      statement: "What was done is printed apart from what refused the command.",
    },
    {
      invariantKind: "departure",
      statement: "An exit code says which kind of thing went wrong.",
    },
    {
      invariantKind: "departure",
      statement: "An unclassified failure says so rather than claiming a kind.",
    },
    {
      invariantKind: "departure",
      statement: "A commit is authored by akasha whatever ran the command.",
    },
  ],
} as const satisfies Module
