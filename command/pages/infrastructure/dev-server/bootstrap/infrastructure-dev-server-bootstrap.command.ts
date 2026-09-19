import type { Command } from "akasha/command/command.page-type.types.ts"

export const infrastructureDevServerBootstrap = {
  id: "01a09404-cdd0-7681-995a-00232cd57b1c",
  type: "page-type/command",
  slug: "infrastructure-dev-server-bootstrap",
  definition: "the command writing an app's `.env.local` from the app's secret pages",
  code: "ts",
  test: "ts",
  name: "bootstrap",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit said as a word and after `--commit` is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree the commit names is laid down where that tree is not laid down already.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Nothing here writes over an `.env.local` already there unless the command is told to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal after the `.env.local` was written says that file was written.",
    },
  ],
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/force" },
    { argument: "argument/commit", required: true, saidAs: "flag-or-word" },
    { argument: "argument/web-app", required: true },
  ],
} as const satisfies Command
