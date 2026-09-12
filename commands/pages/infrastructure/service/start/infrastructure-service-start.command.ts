import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureServiceStart = {
  id: "01a09408-3c21-76b5-9bca-08ff2b3e3716",
  type: "command",
  slug: "infrastructure-service-start",
  definition: "the command asking systemd to run one service's unit",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  name: "start",
  taking: [
    { said: "<slug>", takes: "the service to start, named by the slug its page carries" },
    { said: "--dry-run", takes: "say what would happen and change nothing" },
  ],
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
} as const satisfies Command
