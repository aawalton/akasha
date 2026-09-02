import type { Command } from "@akasha/command-system/command"

export const temperUpstreamDataPort = {
  id: "01a0603c-c1da-795b-8baf-e00c1b4eb588",
  pageTypeSlug: "command",
  slug: "temper-upstream-data-port",
  definition:
    "the command bringing an upstream game library's data into the files this repository carries",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "<library>", takes: "which upstream library is ported" },
    { said: "--code-root <path>", takes: "the checkout the ported files land in" },
  ],
  helpNotes: [
    "the libraries this ports are housing, the map data, the treasure data and the zone data.",
    "the port is written whole rather than merged, so what upstream dropped is dropped here.",
    "a library this does not carry is refused by name.",
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
} as const satisfies Command
