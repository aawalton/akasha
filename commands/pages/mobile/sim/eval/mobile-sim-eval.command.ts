import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimEval = {
  id: "01a0685d-ceae-7007-b4f3-e21611c10292",
  type: "command",
  slug: "mobile-sim-eval",
  definition:
    "the command running JavaScript inside the simulator's webview and giving back what it returned",
  code: "ts",
  taking: [
    {
      said: "<js>",
      takes: "the script to run, representing `--script`; a piped script is said at the flag",
    },
    { said: "--script <js>", takes: "the script to run, which returns what is to come back" },
    { said: "--script -", takes: "the script to run, read from what is piped in" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A script runs in the session already there rather than in a session opened here.",
    },
    {
      invariantKind: "departure",
      statement: "The webview is attached to before a script runs.",
    },
    {
      invariantKind: "departure",
      statement: "The value a script returns is answered as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "A script that throws is a refusal with the fault that script threw.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a session.",
    },
  ],
  name: "eval",
} as const satisfies Command
