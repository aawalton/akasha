import type { Command } from "akasha/command/command.page-type.types.ts"

export const mobileSimEval = {
  id: "01a0685d-ceae-7007-b4f3-e21611c10292",
  type: "page-type/command",
  slug: "mobile-sim-eval",
  definition:
    "the command running JavaScript inside the simulator's webview and giving back what it returned",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A script runs in the session already there rather than in a session opened here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The webview is attached to before a script runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value a script returns is answered as JSON.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A script that throws is a refusal with the fault that script threw.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the context switch attaching to the webview already made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A script is named as sent before that script goes out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that threw after the script went out names that script in its refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a script did in the webview is not read back here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The session and the running are handed in.",
    },
  ],
  name: "eval",
  arguments: [{ argument: "argument/script", required: true, saidAs: "flag-or-word" }],
} as const satisfies Command
