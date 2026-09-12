import type { Command } from "akasha/commands/command.page-type.types.ts"

export const modelGatewayStatus = {
  id: "01a07c0e-59f9-7b4f-be43-11f442d1ea33",
  type: "command",
  slug: "model-gateway-status",
  definition: "the command weighing the gateway each live seat runs against the tree here",
  code: "ts",
  test: "ts",
  parts: [],
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A status weighs the running version against the tree here rather than a published version.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is current where the running version and the tree here match.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is lagging where the tree has moved and that seat has not.",
    },
    {
      invariantKind: "departure",
      statement:
        "A version either side does not answer is answered as unknown rather than lagging.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no name is named by the leading letters of its agent id.",
    },
    {
      invariantKind: "departure",
      statement: "A flag `model-gateway status` does not take is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "A word naming a seat is refused.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
  ],
  name: "status",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
