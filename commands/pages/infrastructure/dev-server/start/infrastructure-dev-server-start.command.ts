import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureDevServerStart = {
  id: "01a09403-25b7-766e-92a9-4834be618b75",
  type: "command",
  slug: "infrastructure-dev-server-start",
  definition: "the command spawning one app's dev server and recording where it is",
  code: "ts",
  changeKind: "change-mechanical",
  name: "start",
  taking: [
    { said: "<seq>", takes: "the branch sequence number, said here where no flag names it" },
    {
      said: "--seq <n>",
      takes: "the branch sequence number naming the worktree, the state file and the log",
    },
    {
      said: "--app <name>",
      takes: "which app to start, named by the slug that app's web app page carries",
    },
    {
      said: "--port <p>",
      takes: "the port to run on, replacing the one the base port and the seq work out",
    },
    { said: "--json", takes: "answer as one JSON line rather than as lines a reader takes" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seq said as a word is read only where no flag names a seq.",
    },
    {
      invariantKind: "departure",
      statement: "A server already running is refused rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement:
        "The app's `.env.local` is written from the app's secret pages where that file is not there yet.",
    },
    {
      invariantKind: "departure",
      statement: "The port is the app's base port against the seq where no port is named.",
    },
    {
      invariantKind: "departure",
      statement:
        "The worktree the seq names is the one `WORKTREE_DIR` states where `WORKTREE_DIR` states one.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes over an `.env.local` already there.",
    },
  ],
} as const satisfies Command
