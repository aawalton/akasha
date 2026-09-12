import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const buildOutput = {
  id: "01a09190-5f20-7946-9db3-368a18b17537",
  type: "module",
  slug: "build-output",
  definition: "the folder the addon build writes into",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The index answers where the domain page sits.",
    },
    {
      invariantKind: "departure",
      statement: "The folder sits beside that page under the name the build folder property gives.",
    },
    {
      invariantKind: "departure",
      statement: "The path answered is relative to the repository root.",
    },
    {
      invariantKind: "constraint",
      statement: "An index naming no such domain is an error rather than a guessed path.",
    },
  ],
} as const satisfies Module
