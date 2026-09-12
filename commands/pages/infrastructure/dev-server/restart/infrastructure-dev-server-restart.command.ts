import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureDevServerRestart = {
  id: "01a09403-c58e-76ba-82dc-317be1c2700b",
  type: "command",
  slug: "infrastructure-dev-server-restart",
  definition: "the command stopping one app's dev server and starting it again",
  code: "ts",
  name: "restart",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seq said as a word and after `--seq` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "This answers with the answer its start gave where that start gave no refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A stop that refused leaves the start unrun.",
    },
    {
      invariantKind: "departure",
      statement: "A start that refused names the server the stop ended beside that refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A restart that stopped part way names each server it ended and each it started.",
    },
    {
      invariantKind: "departure",
      statement: "A restart that ended nothing is refused as the fault alone.",
    },
  ],
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/seq", saidAs: "flag-or-word" },
    { argument: "argument/web-app" },
    { argument: "argument/port" },
  ],
} as const satisfies Command
