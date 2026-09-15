import type { Command } from "akasha/command/command.page-type.types.ts"

export const changeSubagentDrop = {
  id: "01a09c36-3d50-7a79-bd0e-4dc4c5770224",
  type: "page-type/command",
  slug: "change-subagent-drop",
  definition: "the command taking away records a seat keeps without landing any of them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A drop reaches the records kept beside this agent's page for the subagents under it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is piped in as a line `at:` and that path, one path to a line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The paths a drop takes away are piped in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop piping nothing in is refused rather than taking every record away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop saying `all: true` reaches every record that drop is over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`all: true` said beside a path refuses the drop.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is read against the repository root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path naming no record the drop reaches refuses the drop.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop that refuses leaves every record where those records are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop names each record that went.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop naming paths says how many records are still kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop leaving no record takes the file those records were in away.",
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
      statement: "The help flag is answered with what a drop does and what a drop takes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A drop lands nothing.",
    },
  ],
  name: "drop",
  arguments: [],
} as const satisfies Command
