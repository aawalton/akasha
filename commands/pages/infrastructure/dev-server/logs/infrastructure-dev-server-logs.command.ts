import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureDevServerLogs = {
  id: "01a09404-76c2-7202-b118-752495e599e2",
  type: "command",
  slug: "infrastructure-dev-server-logs",
  definition: "the command answering the tail of one dev server's captured output",
  code: "ts",
  test: "ts",
  name: "logs",
  parts: ["module/last-lines"],
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seq said as a word and after `--seq` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The log is answered as the log was when the answer was built.",
    },
    {
      invariantKind: "departure",
      statement: "A log no file is there for is answered against the data rather than the caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here follows a log as the log grows.",
    },
  ],
  arguments: [
    { argument: "argument/seq", saidAs: "flag-or-word" },
    { argument: "argument/web-app" },
    { argument: "argument/tail" },
  ],
} as const satisfies Command
