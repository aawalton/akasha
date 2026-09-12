import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const cli = {
  id: "01a04bdd-596d-7b27-bcc5-9acb2728eb0f",
  type: "module",
  slug: "cli",
  definition: "the name on the path answered, printed and given an exit code",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
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
      statement: "The report is printed apart from the refusals.",
    },
    {
      invariantKind: "departure",
      statement: "An exit code says which kind of thing went wrong.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a run is outside the command line is gathered here and handed to the command.",
    },
  ],
} as const satisfies Module
