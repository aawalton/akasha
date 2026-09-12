import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureDevServerStart = {
  id: "01a09403-25b7-766e-92a9-4834be618b75",
  type: "command",
  slug: "infrastructure-dev-server-start",
  definition: "the command spawning one app's dev server and recording where it is",
  code: "ts",
  name: "start",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seq said as a word and after `--seq` is refused.",
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
    {
      invariantKind: "departure",
      statement:
        "A start that stopped after it spawned the server names the pid and port it left running.",
    },
    {
      invariantKind: "departure",
      statement: "A start that stopped before it wrote anything is refused as the fault alone.",
    },
  ],
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/seq", required: true, saidAs: "flag-or-word" },
    { argument: "argument/web-app", required: true },
    { argument: "argument/port" },
  ],
} as const satisfies Command
