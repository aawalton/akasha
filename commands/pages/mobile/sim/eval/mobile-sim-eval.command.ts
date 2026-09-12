import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileSimEval = {
  id: "01a0685d-ceae-7007-b4f3-e21611c10292",
  type: "command",
  slug: "mobile-sim-eval",
  definition:
    "the command running JavaScript inside the simulator's webview and giving back what it returned",
  code: "ts",
  test: "ts",
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
    {
      invariantKind: "departure",
      statement: "A refusal names the context switch attaching to the webview already made.",
    },
    {
      invariantKind: "departure",
      statement: "A script is named as sent before that script goes out.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw after the script went out names that script in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "What a script did in the webview is not read back here.",
    },
    {
      invariantKind: "departure",
      statement: "The session and the running are handed in.",
    },
  ],
  name: "eval",
  arguments: [{ argument: "argument/script", required: true, saidAs: "flag-or-word" }],
} as const satisfies Command
