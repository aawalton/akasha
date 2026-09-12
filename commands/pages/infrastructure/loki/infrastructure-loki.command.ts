import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureLoki = {
  id: "01a06809-250b-7ab3-b9ac-5e00cfbba4ec",
  type: "command",
  slug: "infrastructure-loki",
  definition: "the command answering the log lines Loki has for a pod, newest first",
  code: "ts",
  test: "ts",
  taking: [
    {
      said: "--since <duration>",
      takes: "how far back from now to look, in s, m, h or d, `1h` where none is said",
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
    { invariantKind: "departure", statement: "A call saying no limit answers five hundred lines." },
  ],
  name: "loki",
  arguments: [
    { argument: "argument/limit" },
    { argument: "argument/pod", saidAs: "flag-or-word" },
    { argument: "argument/kube-namespace" },
    { argument: "argument/cursor" },
    { argument: "argument/every-line" },
  ],
} as const satisfies Command
