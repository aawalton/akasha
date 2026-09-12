import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperUpstreamDataPort = {
  id: "01a0603c-c1da-795b-8baf-e00c1b4eb588",
  type: "command",
  slug: "temper-upstream-data-port",
  definition:
    "the command bringing an upstream game library's data into the files this repository has",
  code: "ts",
  taking: [
    {
      said: "<library>",
      takes: "which upstream library is ported: housing, lib-map-data, lib-treasure or lib-zone",
    },
    { said: "--code-root <path>", takes: "the checkout the ported files land in" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One call ports one library.",
    },
    {
      invariantKind: "departure",
      statement: "The port is written whole rather than merged.",
    },
    {
      invariantKind: "departure",
      statement: "A library the port list does not hold refuses the call.",
    },
  ],
  name: "data-port",
} as const satisfies Command
