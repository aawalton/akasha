import type { Command } from "akasha/command/command.page-type.types.ts"

export const infrastructureServiceStop = {
  id: "01a09408-a1a1-7e96-9e19-38cfb6a5715e",
  type: "page-type/command",
  slug: "infrastructure-service-stop",
  definition: "the command asking systemd to end one service's unit",
  code: "ts",
  test: "ts",
  name: "stop",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One service is named, and one at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only that service's own units are reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page that will not read stops the call before anything is asked.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is installed for the whole machine.",
    },
  ],
  arguments: [{ argument: "argument/workstation-service", required: true, saidAs: "word" }],
} as const satisfies Command
