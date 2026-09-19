import type { Command } from "akasha/command/command.page-type.types.ts"

export const infrastructureDevServerStatus = {
  id: "01a09404-18a4-709b-8039-58c3e580da98",
  type: "page-type/command",
  slug: "infrastructure-dev-server-status",
  definition: "the command reading whether an app's dev server is running or stopped",
  code: "ts",
  test: "ts",
  name: "status",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit said as a word and after `--commit` is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming neither a commit nor an app is read rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a call answers for every server a state file tracks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A state file naming a process that is gone reads as stopped.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes a state file away.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a state file.",
    },
  ],
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/commit", saidAs: "flag-or-word" },
    { argument: "argument/web-app" },
  ],
} as const satisfies Command
