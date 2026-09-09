import type { Command } from "../../../command.page-type.ts"

export const modelGatewayStatus = {
  id: "01a07c0e-59f9-7b4f-be43-11f442d1ea33",
  pageTypeSlug: "command",
  type: "command",
  slug: "model-gateway-status",
  definition: "the command weighing the gateway each live seat runs against the tree here",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  parts: ["module/live-gateway-seats"],
  taking: [{ said: "--json", takes: "the answer as one JSON object rather than as rows" }],
  helpNotes: [
    "auto-swap is disarmed, so a running gateway stays on the version it was spawned at until a swap moves it, and a status reports the lag that leaves.",
    "the version a status weighs against is the tree on disk here, which is what the next spawn would run.",
    "on disk rather than published, because the gateway is spawned from this repository rather than deployed, so nothing publishes a version for it.",
    "a seat is current where the two versions match, lagging where the tree has moved and the seat has not, and unknown where either version will not read.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A status weighs the running version against the tree here rather than a published version.",
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
} as const satisfies Command
