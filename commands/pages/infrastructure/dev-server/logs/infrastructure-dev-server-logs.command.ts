import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureDevServerLogs = {
  id: "01a09404-76c2-7202-b118-752495e599e2",
  type: "command",
  slug: "infrastructure-dev-server-logs",
  definition: "the command answering the tail of one dev server's captured output",
  code: "ts",
  test: "ts",
  changeKind: "change-none",
  name: "logs",
  parts: ["module/last-lines"],
  taking: [
    { said: "<seq>", takes: "the branch sequence number, said here where no flag names it" },
    { said: "--seq <n>", takes: "the branch sequence number naming the log" },
    {
      said: "--app <name>",
      takes: "whose log to read, named by the slug that app's web app page carries",
    },
    { said: "--tail <n>", takes: "how many trailing lines of the log to answer with" },
  ],
  helpNotes: ["a tail nothing said is a hundred lines."],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seq said as a word is read only where no flag names a seq.",
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
} as const satisfies Command
