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
      statement: "An answer is waited for before the report is printed.",
    },
    {
      invariantKind: "departure",
      statement: "The report and the refusals are out before the exit code ends the process.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is written by writes that return before the exit code is given.",
    },
    {
      invariantKind: "departure",
      statement:
        "A write carrying part of the answer is followed by a write of the bytes left over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A destination refusing bytes for the moment is written to again rather than dropping the bytes left over.",
    },
    {
      invariantKind: "absence",
      statement: "Writing the answer sets no length on the destination beforehand.",
    },
    {
      invariantKind: "departure",
      statement: "The report is printed apart from the refusals.",
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
      statement: "A commit names akasha as the author rather than the caller of the command.",
    },
  ],
} as const satisfies Module
