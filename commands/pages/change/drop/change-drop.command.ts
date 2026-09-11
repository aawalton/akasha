import type { Command } from "akasha/commands/command.page-type.types.ts"

export const changeDrop = {
  id: "01a08175-75cb-75dc-a288-942c054573f9",
  pageTypeSlug: "command",
  type: "command",
  slug: "change-drop",
  definition: "the command taking kept edits away without landing any of them",
  code: "ts",
  test: "ts",
  changeKind: "change-authored",
  helpNotes: [
    "a drop reaches the edits kept beside this agent's own page, and takes no word naming anything else.",
    "the paths to drop are piped in, one to a line, written `at` and the path.",
    "`all: true` piped in reaches every edit the drop is over, and no path is named beside it.",
    "a drop piping nothing in is refused, so a bare call takes nothing away.",
    "a path naming no edit the drop reaches refuses the drop, so a typo takes nothing away.",
    "a drop names each edit that went, because nothing puts a dropped edit back.",
    "a drop lands nothing, so what went is gone rather than committed.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A drop reaches the edits kept beside this agent's page.",
    },
    {
      invariantKind: "departure",
      statement: "A word on the command line is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag is refused as any other word is.",
    },
    {
      invariantKind: "departure",
      statement: "The paths a drop takes away are piped in.",
    },
    {
      invariantKind: "departure",
      statement: "A drop piping nothing in is refused rather than taking every edit away.",
    },
    {
      invariantKind: "departure",
      statement: "A drop saying `all: true` reaches every edit that drop is over.",
    },
    {
      invariantKind: "departure",
      statement: "`all: true` said beside a path refuses the drop.",
    },
    {
      invariantKind: "departure",
      statement: "A path is read against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no edit the drop reaches refuses the drop.",
    },
    {
      invariantKind: "departure",
      statement: "A drop names each edit that went.",
    },
    {
      invariantKind: "departure",
      statement: "A drop naming paths says how many edits are still kept.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A drop lands nothing.",
    },
    {
      invariantKind: "absence",
      statement: "No taking is stated here.",
    },
  ],
} as const satisfies Command
