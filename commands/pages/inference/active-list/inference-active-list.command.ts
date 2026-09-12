import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceActiveList = {
  id: "01a0685e-fd50-7513-8357-2d89b53ef8b1",
  type: "command",
  slug: "inference-active-list",
  definition: "the command naming the pool services the traffic cop is holding resident",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The resident services are read off the cop.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing resident is an empty answer rather than a refusal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes which services are resident.",
    },
  ],
  name: "active-list",
  arguments: [],
} as const satisfies Command
