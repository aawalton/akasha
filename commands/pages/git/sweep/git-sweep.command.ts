import type { Command } from "akasha/commands/command.page-type.types.ts"

export const gitSweep = {
  id: "01a091c8-1761-7abf-827f-f2622036c56c",
  type: "command",
  slug: "git-sweep",
  definition: "the command taking away what akasha left under the folder git does not track",
  code: "ts",
  test: "ts",
  taking: [{ said: "--dry-run", takes: "say what would be taken away, and take nothing" }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sweep takes no path on the command line.",
    },
    {
      invariantKind: "departure",
      statement: "The reach is read from the pages rather than said here.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run reports what the run would take and takes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The report names each path taken.",
    },
    {
      invariantKind: "departure",
      statement: "A run finding nothing to take says so.",
    },
    {
      invariantKind: "departure",
      statement: "A path that would not go makes the call refuse.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is committed.",
    },
    {
      invariantKind: "absence",
      statement: "No name akasha keeps is taken.",
    },
  ],
  name: "sweep",
} as const satisfies Command
