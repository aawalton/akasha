import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const flagArguing = {
  id: "01a08210-304b-74bd-95f9-7f1105af1da7",
  type: "module",
  slug: "flag-arguing",
  definition: "a path a call said, read against the home directory or against the root handed over",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path opening with `~/` is read against the home directory.",
    },
    {
      invariantKind: "departure",
      statement: "An absolute path is taken as that path is.",
    },
    {
      invariantKind: "departure",
      statement: "Any other path is read against the root the caller handed over.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the repository is a path, since a render is written outside it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which arguments a command takes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file or reaches the disk.",
    },
  ],
} as const satisfies Module
