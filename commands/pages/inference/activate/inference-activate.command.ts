import type { Command } from "akasha/commands/command.page-type.types.ts"

export const inferenceActivate = {
  id: "01a0685e-fd50-7dbf-9d25-99f97c25cd78",
  type: "command",
  slug: "inference-activate",
  definition: "the command making one pool service the resident the traffic cop serves",
  code: "ts",
  taking: [{ said: "<name>", takes: "the pool service made resident" }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One name is made resident.",
    },
    {
      invariantKind: "departure",
      statement: "A name the cop does not carry is refused naming the ones the cop does.",
    },
    {
      invariantKind: "departure",
      statement: "A service already resident is made resident by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The answer names the resident rather than the service asked for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here provisions the service or starts the cop.",
    },
  ],
  name: "activate",
} as const satisfies Command
