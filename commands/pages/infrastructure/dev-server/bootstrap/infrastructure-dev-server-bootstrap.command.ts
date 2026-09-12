import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureDevServerBootstrap = {
  id: "01a09404-cdd0-7681-995a-00232cd57b1c",
  type: "command",
  slug: "infrastructure-dev-server-bootstrap",
  definition: "the command writing an app's `.env.local` from the app's secret pages",
  code: "ts",
  name: "bootstrap",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seq said as a word is read only where no flag names a seq.",
    },
    {
      invariantKind: "departure",
      statement:
        "The worktree the seq names is the one `WORKTREE_DIR` states where `WORKTREE_DIR` states one.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here writes over an `.env.local` already there unless the command is told to.",
    },
  ],
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/force" },
    { argument: "argument/seq", saidAs: "flag-or-word" },
    { argument: "argument/web-app" },
  ],
} as const satisfies Command
