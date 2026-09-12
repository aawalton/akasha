import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureServiceStop = {
  id: "01a09408-a1a1-7e96-9e19-38cfb6a5715e",
  type: "command",
  slug: "infrastructure-service-stop",
  definition: "the command asking systemd to end one service's unit",
  code: "ts",
  name: "stop",
  taking: [
    { said: "<slug>", takes: "the service to stop, named by the slug its page carries" },
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
