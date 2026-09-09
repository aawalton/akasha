import type { Command } from "../../../command.page-type.ts"

export const modelGatewaySwap = {
  id: "01a07c0e-7ae3-7f8a-935d-ab6589ed46e5",
  pageTypeSlug: "command",
  slug: "model-gateway-swap",
  definition: "the command respawning a live seat's gateway on the bytecode here",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "<target>", takes: "the seat to swap, named as its page is named or by its id" },
    { said: "--fleet", takes: "every live seat in turn rather than one named" },
    { said: "--json", takes: "the answer as one JSON object rather than as rows" },
  ],
  helpNotes: [
    "a swap writes the ask into the seat's uncommitted values, and the supervisor takes it up as it handles and respawns the gateway alone.",
    "the port holds, the address the client is pointed at holds, and the client in the seat is not restarted.",
    "a seat holding no live gateway is passed over, and its next boot spawns at whatever version is there then.",
    "a swap is for rolling out a fix that cannot wait, since an ordinary deploy no longer reaches a running gateway.",
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
      invariantKind: "departure",
      statement:
        "A name that could name no seat is answered apart from a name no seat that is there answers to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here restarts a client.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here arms a further act on the seat this command swapped.",
    },
  ],
} as const satisfies Command
