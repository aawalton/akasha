import type { Command } from "akasha/commands/command.page-type.types.ts"

export const modelGatewaySwap = {
  id: "01a07c0e-7ae3-7f8a-935d-ab6589ed46e5",
  type: "command",
  slug: "model-gateway-swap",
  definition: "the command respawning a live seat's gateway on the bytecode here",
  code: "ts",
  test: "ts",
  taking: [
    { said: "<target>", takes: "the seat to swap, named as its page is named or by its id" },
    { said: "--fleet", takes: "every live seat in turn rather than one named" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A swap writes the ask into the seat's uncommitted values.",
    },
    {
      invariantKind: "departure",
      statement: "The ask a swap writes is spelled as the page with that name is spelled.",
    },
    {
      invariantKind: "departure",
      statement: "The gateway alone is respawned.",
    },
    {
      invariantKind: "departure",
      statement: "The gateway is respawned on the port the gateway already had.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no live gateway is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A swap reaches one seat or every live seat.",
    },
    {
      invariantKind: "departure",
      statement: "A swap naming no seat and no fleet is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A swap naming a seat and the fleet together is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A second seat named beside the first is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every seat a fleet swap reaches is acted on rather than a stop at the first seat not answering.",
    },
    {
      invariantKind: "departure",
      statement: "A fleet swap is staggered.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here restarts a client.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here arms a further act on the seat this command swapped.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat that did not take the swap up before the wait ran out is refused as an operational fault.",
    },
    {
      invariantKind: "departure",
      statement: "Each seat is named as soon as that seat holds the ask.",
    },
    {
      invariantKind: "departure",
      statement: "A swap that threw part way names those seats in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A seat holding the ask swaps whether or not this call lives to say so.",
    },
    {
      invariantKind: "departure",
      statement: "The asking this runs is handed in.",
    },
  ],
  name: "swap",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
