import type { Command } from "akasha/command/command.page-type.types.ts"

export const inferenceActivate = {
  id: "01a0685e-fd50-7dbf-9d25-99f97c25cd78",
  type: "page-type/command",
  slug: "inference-activate",
  definition: "the command making a pool service the resident the traffic cop serves",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One name is made resident.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the cop does not carry is refused naming the ones the cop does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service already resident is made resident by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names the resident rather than the service asked for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here provisions the service or starts the cop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal after the swap was posted says the swap was posted.",
    },
  ],
  name: "activate",
  arguments: [{ argument: "argument/pool-service", required: true, saidAs: "word" }],
} as const satisfies Command
