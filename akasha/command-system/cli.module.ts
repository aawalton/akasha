import type { Module } from "../code-system/module/module.page-type.ts"

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
      statement: "What akasha needs from outside is gathered here and nowhere deeper.",
    },
    {
      invariantKind: "departure",
      statement: "A command answers and this prints.",
    },
    {
      invariantKind: "departure",
      statement: "What was done is printed apart from what refused it.",
    },
    {
      invariantKind: "departure",
      statement:
        "An exit code says which kind of thing went wrong, and an unclassified failure says so rather than claiming a kind.",
    },
    {
      invariantKind: "departure",
      statement: "A commit is authored by akasha, whatever ran the command.",
    },
  ],
} as const satisfies Module
