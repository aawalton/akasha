import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureDevServerBootstrap = {
  id: "01a09404-cdd0-7681-995a-00232cd57b1c",
  type: "command",
  slug: "infrastructure-dev-server-bootstrap",
  definition: "the command writing an app's `.env.local` from the app's secret pages",
  code: "ts",
  name: "bootstrap",
  taking: [
    { said: "<seq>", takes: "the branch sequence number, said here where no flag names it" },
    { said: "--seq <n>", takes: "the branch sequence number naming the worktree" },
    {
      said: "--app <name>",
      takes: "whose `.env.local` to write, named by the slug that app's web app page carries",
    },
    { said: "--force", takes: "write over the `.env.local` already there" },
    { said: "--json", takes: "answer as one JSON line rather than as lines a reader takes" },
  ],
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
} as const satisfies Command
