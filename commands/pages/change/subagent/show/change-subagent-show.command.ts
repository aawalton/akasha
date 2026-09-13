import type { Command } from "akasha/commands/command.page-type.types.ts"

export const changeSubagentShow = {
  id: "01a09c35-c330-7e3d-a291-b3fc8a455c70",
  type: "command",
  slug: "change-subagent-show",
  definition: "the command answering whole the records a seat keeps at one path",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A show answers the records kept beside this agent's page for the subagents under it.",
    },
    {
      invariantKind: "departure",
      statement: "The arguments a show takes are read from standard input.",
    },
    {
      invariantKind: "departure",
      statement: "The arguments are read by the reader `akasha change` reads its arguments with.",
    },
    {
      invariantKind: "departure",
      statement: "A call piping nothing in is refused rather than run with no argument.",
    },
    {
      invariantKind: "departure",
      statement: "The key `at` names the path shown.",
    },
    {
      invariantKind: "departure",
      statement: "A key other than `at` is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A path is read against the repository root here.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the repository is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no path is refused rather than answering every record.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no record is refused rather than answered with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every record at the path named is answered rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record is opened by the subagent that left it, the time the seat took it, and what it does.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record changing a body answers the text drafted against and the text that record would leave.",
    },
    {
      invariantKind: "departure",
      statement: "A record adding or appending answers the body that record carries.",
    },
    {
      invariantKind: "departure",
      statement: "A record carrying no body answers its opening line alone.",
    },
    {
      invariantKind: "departure",
      statement: "A record whose line reads as no edit is reached by no path.",
    },
    {
      invariantKind: "departure",
      statement: "An answer past what one answer holds is refused rather than broken off partway.",
    },
    {
      invariantKind: "departure",
      statement: "The bytes one answer has are the bytes `akasha read` holds.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A text answered is not formatted.",
    },
    {
      invariantKind: "absence",
      statement: "No text answered is recorded as read against the calling agent.",
    },
    {
      invariantKind: "absence",
      statement: "A show writes nothing.",
    },
    {
      invariantKind: "absence",
      statement: "No flag other than the help flag is said on the command line.",
    },
    {
      invariantKind: "departure",
      statement: "The help flag is answered with what a show answers and what a show takes.",
    },
  ],
  name: "show",
  arguments: [],
} as const satisfies Command
