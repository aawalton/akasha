import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const claudeLaunchArgs = {
  id: "01a0695a-d2ea-7745-a7c8-079b5840aab1",
  type: "module",
  slug: "claude-launch-args",
  definition: "the command line a claude child starts under, and the mcp config it is handed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A child is named on its command line for the seat it answers in.",
    },
    {
      invariantKind: "departure",
      statement: "The name a child is started under is the live name and the durable title both.",
    },
  ],
} as const satisfies Module
