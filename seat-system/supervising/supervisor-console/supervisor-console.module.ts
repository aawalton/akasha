import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorConsole = {
  id: "01a0683e-3dbe-7015-b25d-4d947ec851f0",
  pageTypeSlug: "module",
  type: "module",
  slug: "supervisor-console",
  definition:
    "console lines sent to a seat's log page, and to a file until that page can take them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line the log page refuses lands in the file instead rather than being lost.",
    },
    {
      invariantKind: "departure",
      statement:
        "The seat whose page holds a source's lines is looked for again until it is found.",
    },
    {
      invariantKind: "departure",
      statement: "A line written before that seat is found lands in the file.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is said in the name of the source whose lines were refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page refusing lines is said once rather than on every line that page refuses.",
    },
    {
      invariantKind: "departure",
      statement: "Lines written before the agent was known are carried into the agent's own log.",
    },
    {
      invariantKind: "departure",
      statement: "A log at its ceiling is rotated rather than grown.",
    },
  ],
} as const satisfies Module
