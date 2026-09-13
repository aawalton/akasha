import type { Command } from "akasha/commands/command.page-type.types.ts"

export const changeSubagentTake = {
  id: "01a09cec-a352-7ed6-beaf-24fa8359fc60",
  type: "command",
  slug: "change-subagent-take",
  definition: "the command taking records a seat keeps into the edits this agent keeps",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A take reaches the records kept beside this agent's page for the subagents under it.",
    },
    {
      invariantKind: "departure",
      statement: "A path is piped in as a line `at:` and that path, one path to a line.",
    },
    {
      invariantKind: "departure",
      statement: "The paths a take reaches are piped in.",
    },
    {
      invariantKind: "departure",
      statement: "A take piping nothing in is refused rather than reaching every record.",
    },
    {
      invariantKind: "departure",
      statement: "A take saying `all: true` reaches every record that take is over.",
    },
    {
      invariantKind: "departure",
      statement: "`all: true` said beside a path refuses the take.",
    },
    {
      invariantKind: "departure",
      statement: "A path is read against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no record the take reaches refuses the take.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every record a path names is taken, so a chain of records over one path is taken whole.",
    },
    {
      invariantKind: "departure",
      statement: "A record taken is kept beside this agent's page as an edit of this agent's own.",
    },
    {
      invariantKind: "departure",
      statement: "A record taken is no longer kept for the subagent that left it.",
    },
    {
      invariantKind: "departure",
      statement: "`akasha change apply` lands what is taken, and a take lands nothing itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record is weighed against the body it names and the edits this agent keeps already.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record whose old text and new text the body both holds cannot be judged landed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record held back that way is taken where the lines piped in say `unlanded: true`.",
    },
    {
      invariantKind: "departure",
      statement: "`unlanded` takes `true` and no other value.",
    },
    {
      invariantKind: "departure",
      statement: "A record the body already holds the new text of is said to have landed already.",
    },
    {
      invariantKind: "departure",
      statement: "A record the body holds neither text of is said to be stale.",
    },
    {
      invariantKind: "departure",
      statement: "A record read as landed already or as stale is held back whatever the call says.",
    },
    {
      invariantKind: "departure",
      statement: "A take that refuses leaves every record where it is and keeps no edit.",
    },
    {
      invariantKind: "departure",
      statement: "A take names each record it took and says how many records are still kept.",
    },
    {
      invariantKind: "departure",
      statement: "A record whose line reads as no edit is reached by no path.",
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
      invariantKind: "departure",
      statement: "A word on the command line other than the help flag is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag other than the help flag is refused as any other word is.",
    },
    {
      invariantKind: "departure",
      statement: "The help flag is answered with what a take does and what a take takes.",
    },
  ],
  name: "take",
  arguments: [],
} as const satisfies Command
