import type { Command } from "akasha/commands/command.page-type.types.ts"

export const gitPush = {
  id: "01a06cce-9280-7c22-afc1-5cfcba8a5ac4",
  type: "command",
  slug: "git-push",
  definition: "the command carrying this checkout's commits to the remote its branch tracks",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A push carries the branch this checkout is on to the remote that branch tracks.",
    },
    {
      invariantKind: "departure",
      statement: "A remote refusing the push is reported as a failure.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` reads how far ahead the branch is without reaching the remote.",
    },
    {
      invariantKind: "departure",
      statement: "A checkout naming no remote is refused rather than reported as done.",
    },
    {
      invariantKind: "absence",
      statement: "No push is forced in any form.",
    },
    {
      invariantKind: "absence",
      statement: "A push takes no argument naming the branch carried.",
    },
  ],
  name: "push",
  arguments: [{ argument: "argument/dry-run" }],
} as const satisfies Command
