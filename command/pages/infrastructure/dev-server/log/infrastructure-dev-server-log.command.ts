import type { Command } from "akasha/command/command.page-type.types.ts"

export const infrastructureDevServerLog = {
  id: "01a09404-76c2-7202-b118-752495e599e2",
  type: "page-type/command",
  slug: "infrastructure-dev-server-log",
  definition: "the command answering the tail of one dev server's captured output",
  code: "ts",
  test: "ts",
  name: "log",
  parts: ["module/last-lines"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit said as a word and after `--commit` is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The log is answered as the log was when the answer was built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A log no file is there for is answered against the data rather than the caller.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here follows a log as the log grows.",
    },
  ],
  arguments: [
    { argument: "argument/commit", required: true, saidAs: "flag-or-word" },
    { argument: "argument/web-app", required: true },
    { argument: "argument/tail" },
  ],
} as const satisfies Command
