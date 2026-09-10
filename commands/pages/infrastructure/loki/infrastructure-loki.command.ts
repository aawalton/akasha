import type { Command } from "../../../command.page-type.types.ts"

export const infrastructureLoki = {
  id: "01a06809-250b-7ab3-b9ac-5e00cfbba4ec",
  pageTypeSlug: "command",
  type: "command",
  slug: "infrastructure-loki",
  definition: "the log lines Loki has for a pod, newest first",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  taking: [
    { said: "logs", takes: "the act, which is the lines Loki holds for a pod" },
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
  helpNotes: [
    "every line answered is one JSON object, and the last of them states what bounded the answer rather than stating a log line.",
    "a log line states the timestamp and the line; the bounding line states the count, the cursor, whether it is done, and what clipped it.",
    "the bounding line rides the lines it bounds, because an answer here has one channel and no second one to move a diagnostic onto.",
    "a pod name and a namespace are read as literal strings, so a caller escapes nothing and can inject no matcher syntax through them.",
    "`--all` is bounded by the window and never by a line count, so a window that clipped is reached by widening `--since`.",
    "a pod prefix matching nothing answers no log line, and the bounding line says whether that absence means anything.",
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
} as const satisfies Command
