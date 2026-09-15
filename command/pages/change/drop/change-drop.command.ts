import type { Command } from "akasha/command/command.page-type.types.ts"

export const changeDrop = {
  id: "01a08175-75cb-75dc-a288-942c054573f9",
  type: "page-type/command",
  slug: "change-drop",
  definition: "the command taking kept edits away without landing any of them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop reaches the edits kept beside this agent's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is piped in as a line `at:` and that path, one path to a line.",
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
      invariantKind: "invariant-kind/departure",
      statement: "The paths a drop takes away are piped in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop piping nothing in is refused rather than taking every edit away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop saying `all: true` reaches every edit that drop is over.",
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
      statement: "A path naming no edit the drop reaches refuses the drop.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop names each edit that went.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A drop naming paths says how many edits are still kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A drop lands nothing.",
    },
  ],
  name: "drop",
  arguments: [],
} as const satisfies Command
