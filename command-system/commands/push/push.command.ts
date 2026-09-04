import type { Command } from "../command.page-type.ts"

export const push = {
  id: "01a06cce-9280-7c22-afc1-5cfcba8a5ac4",
  pageTypeSlug: "command",
  slug: "push",
  definition: "the command carrying this checkout's commits to the remote its branch tracks",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [{ said: "--dry-run", takes: "say how many commits would be carried, and carry none" }],
  helpNotes: [
    "a push carries the branch this checkout is on, so it names no branch and no remote.",
    "`git push` is refused for an agent, and this command is the route that is not refused.",
    "a remote that has moved ahead refuses the push, and the refusal is reported rather than forced through.",
  ],
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
      statement: "A push takes no argument naming what is carried.",
    },
  ],
} as const satisfies Command
