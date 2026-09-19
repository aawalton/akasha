import type { Command } from "akasha/command/command.page-type.types.ts"

export const infrastructureServiceStart = {
  id: "01a09408-3c21-76b5-9bca-08ff2b3e3716",
  type: "page-type/command",
  slug: "infrastructure-service-start",
  definition: "the command asking systemd to run one service's unit",
  code: "ts",
  test: "ts",
  name: "start",
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
