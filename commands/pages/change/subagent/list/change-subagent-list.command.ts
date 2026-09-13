import type { Command } from "akasha/commands/command.page-type.types.ts"

export const changeSubagentList = {
  id: "01a09c2b-f44c-7940-8880-8fbb1272ca1b",
  type: "command",
  slug: "change-subagent-list",
  definition: "the command naming the records a seat keeps for the subagents under it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A list names the records kept beside this agent's page for the subagents under it.",
    },
    {
      invariantKind: "departure",
      statement: "The edits this agent keeps of its own are named by another command.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record is named with the subagent that left it, the time the seat took it, and what it does.",
    },
    {
      invariantKind: "departure",
      statement: "A record saying no subagent or no time is named as saying none.",
    },
    {
      invariantKind: "departure",
      statement: "An edit is said the way every act over the edits kept says an edit.",
    },
    {
      invariantKind: "departure",
      statement:
        "The records are named in the order the seat took them rather than in the order a name sorts.",
    },
    {
      invariantKind: "departure",
      statement: "A record is numbered by its place in what the seat keeps.",
    },
    {
      invariantKind: "departure",
      statement: "A list names the call reading one record whole and the call taking one away.",
    },
    {
      invariantKind: "departure",
      statement: "A list says whether a record it names landed already is undecidable.",
    },
    {
      invariantKind: "departure",
      statement: "A list says no command lands a record it names.",
    },
    {
      invariantKind: "departure",
      statement: "A word on the command line other than the help flag is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag other than the help flag is refused as any other word is.",
    },
    {
      invariantKind: "departure",
      statement: "The help flag is answered with what a list names and what a list takes.",
    },
    {
      invariantKind: "departure",
      statement: "An agent keeping no record is said rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A list takes nothing piped in.",
    },
    {
      invariantKind: "absence",
      statement: "A list writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The help flag reaches this command's own help rather than the namespace's.",
    },
  ],
  name: "list",
  arguments: [],
} as const satisfies Command
