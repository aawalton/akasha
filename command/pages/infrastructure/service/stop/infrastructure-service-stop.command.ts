import type { Command } from "akasha/command/command.page-type.types.ts"

export const infrastructureServiceStop = {
  id: "01a09408-a1a1-7e96-9e19-38cfb6a5715e",
  type: "page-type/command",
  slug: "infrastructure-service-stop",
  definition: "the command asking systemd to end one service's unit",
  code: "ts",
  test: "ts",
  name: "stop",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One service is named, and one at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only that service's own units are reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page that will not read stops the call before anything is asked.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here is installed for the whole machine.",
    },
  ],
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/workstation-service", required: true, saidAs: "word" },
  ],
} as const satisfies Command
