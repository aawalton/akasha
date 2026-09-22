import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildOutput = {
  id: "01a09190-5f20-7946-9db3-368a18b17537",
  type: "page-type/module",
  slug: "build-output",
  definition: "the addon build's output folder",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The index answers where the domain page sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder sits beside that page under the name the build folder property gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The path answered is relative to the repository root.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An index naming no such domain is an error rather than a guessed path.",
    },
  ],
} as const satisfies Module
