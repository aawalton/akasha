import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureLoki = {
  id: "01a06809-250b-7ab3-b9ac-5e00cfbba4ec",
  type: "command",
  slug: "infrastructure-loki",
  definition: "the command answering the log lines Loki has for a pod, newest first",
  code: "ts",
  test: "ts",
  taking: [
    { said: "<pod>", takes: "the pod name to match as a prefix, said here where no flag names it" },
    { said: "--pod <name>", takes: "the pod name to match as a prefix, read as a literal string" },
    {
      said: "--namespace <ns>",
      takes: "the namespace to look in, read as a literal string, `ci` where none is said",
    },
    {
      said: "--since <duration>",
      takes: "how far back from now to look, in s, m, h or d, `1h` where none is said",
    },
    { said: "--limit <n>", takes: "the most lines to answer with, 500 where none is said" },
    { said: "--tail <n>", takes: "the same as `--limit`" },
    {
      said: "--cursor <b64>",
      takes: "the cursor a previous answer stated, reaching the page before it",
    },
    {
      said: "--all",
      takes: "every line inside the window, page after page, rather than the first `--limit`",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every line answered is one JSON object.",
    },
    {
      invariantKind: "departure",
      statement: "The last line answered states the bound on the answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bounding line states the count, the cursor, whether it is done and what clipped it.",
    },
    {
      invariantKind: "departure",
      statement: "A log line states the timestamp and the line and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "The bounding line is told from a log line by a key no log line has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pod name and a namespace are matched as literal strings rather than as patterns.",
    },
    {
      invariantKind: "departure",
      statement: "A window that clipped is answered as clipped rather than as complete.",
    },
    {
      invariantKind: "departure",
      statement:
        "A window check that could not run is answered as undetermined rather than as complete.",
    },
    {
      invariantKind: "departure",
      statement: "Reaching every line is bounded by the window and never by a line count.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix matching nothing is an answer of no lines rather than a refusal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here filters a log body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
  name: "loki",
} as const satisfies Command
