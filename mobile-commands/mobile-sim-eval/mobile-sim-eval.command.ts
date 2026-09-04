import type { Command } from "@akasha/command-system/command"

export const mobileSimEval = {
  id: "01a0685d-ceae-7007-b4f3-e21611c10292",
  pageTypeSlug: "command",
  slug: "mobile-sim-eval",
  definition:
    "the command running JavaScript inside the simulator's webview and giving back what it returned",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<js>", takes: "the script to run, standing for `--script`" },
    { said: "--script <js>", takes: "the script to run, which returns what is to come back" },
    { said: "--script -", takes: "the script to run, read from what is piped in" },
  ],
  helpNotes: [
    "the script has to `return` what is wanted, since a script returning nothing comes back as nothing.",
    "a script too long to sit on a call is piped in and named `-`, and the bare word cannot say that.",
    "the session already standing is what this runs in, so `mobile sim open-url` comes first.",
    "the webview is attached to before the script runs, so a session sitting in the native context still answers.",
    "what comes back is given as JSON, whatever shape it is.",
    "this is how a reading a page only shows on screen is taken, the keyboard-geometry counters among them.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A script runs in the session already standing rather than in one opened here.",
    },
    {
      invariantKind: "departure",
      statement: "The webview is attached to before a script runs.",
    },
    {
      invariantKind: "departure",
      statement: "What a script returns is answered as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "A script that throws is a refusal carrying what it threw.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a session.",
    },
  ],
} as const satisfies Command
