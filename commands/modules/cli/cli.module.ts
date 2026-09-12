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
      statement:
        "A write carrying part of the answer is followed by a write of the bytes left over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A destination refusing bytes for now is written to again rather than dropping the bytes left over.",
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
      statement: "Every run writes again a hook link pointing at a file that is gone.",
    },
  ],
} as const satisfies Module
