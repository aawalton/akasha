import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureServiceRestart = {
  id: "01a09408-da19-7177-908e-7197c74583a4",
  type: "command",
  slug: "infrastructure-service-restart",
  definition: "the command asking systemd to run one service's unit afresh",
  code: "ts",
  name: "restart",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One service is named, and one at a time.",
    },
    {
      invariantKind: "departure",
      statement: "Only that service's own units are reached.",
    },
    {
      invariantKind: "departure",
      statement: "A page that will not read stops the call before anything is asked.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is installed for the whole machine.",
    },
  ],
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/workstation-service", required: true, saidAs: "word" },
  ],
} as const satisfies Command
