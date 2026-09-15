import type { Command } from "akasha/command/command.page-type.types.ts"

export const changeSubagentTake = {
  id: "01a09cec-a352-7ed6-beaf-24fa8359fc60",
  type: "command",
  slug: "change-subagent-take",
  definition: "the command taking records a seat keeps into the edits this agent keeps",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A take reaches the records kept beside this agent's page for the subagents under it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is piped in as a line `at:` and that path, one path to a line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The paths a take reaches are piped in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take piping nothing in is refused rather than reaching every record.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take saying `all: true` reaches every record that take is over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`all: true` said beside a path refuses the take.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is read against the repository root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path naming no record the take reaches refuses the take.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every record a path names is taken, so a chain of records over one path is taken whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record taken is kept beside this agent's page as an edit of this agent's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record taken is no longer kept for the subagent that left it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`akasha change apply` lands what is taken, and a take lands nothing itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A record is weighed against the body it names and the edits this agent keeps already.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A record whose old text and new text the body both holds cannot be judged landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A record held back that way is taken where the lines piped in say `unlanded: true`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`unlanded` takes `true` and no other value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record the body already holds the new text of is said to have landed already.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record the body holds neither text of is said to be stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record read as landed already or as stale is held back whatever the call says.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take that refuses leaves every record where it is and keeps no edit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A take names each record it took and says how many records are still kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record whose line reads as no edit is reached by no path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent keeping no record is said rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word on the command line other than the help flag is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag other than the help flag is refused as any other word is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The help flag is answered with what a take does and what a take takes.",
    },
  ],
  name: "take",
  arguments: [],
} as const satisfies Command
