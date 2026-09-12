import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureDevServerStatus = {
  id: "01a09404-18a4-709b-8039-58c3e580da98",
  type: "command",
  slug: "infrastructure-dev-server-status",
  definition: "the command reading whether an app's dev server is running or stopped",
  code: "ts",
  test: "ts",
  name: "status",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seq said as a word and after `--seq` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming neither a seq nor an app is read rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "Such a call answers for every server a state file tracks.",
    },
    {
      invariantKind: "departure",
      statement: "A state file naming a process that is gone reads as stopped.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a state file away.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a state file.",
    },
  ],
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/seq", saidAs: "flag-or-word" },
    { argument: "argument/web-app" },
  ],
} as const satisfies Command
