import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const gitStoreSweeping = {
  id: "01a091c7-3c36-724a-a2ce-575287558db5",
  type: "module",
  slug: "git-store-sweeping",
  definition: "what akasha left under the folder git does not track, taken away",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reach is the paths `git-place` says akasha keeps no longer.",
    },
    {
      invariantKind: "departure",
      statement: "A path is read against the folder every worktree of a checkout shares.",
    },
    {
      invariantKind: "departure",
      statement: "A path nothing is at is passed over rather than reported as taken.",
    },
    {
      invariantKind: "departure",
      statement: "A path is taken with everything under it.",
    },
    {
      invariantKind: "departure",
      statement: "What would be taken is answered apart from the taking.",
    },
    {
      invariantKind: "departure",
      statement: "A path that will not go is reported against that path.",
    },
    {
      invariantKind: "departure",
      statement: "Every path is acted on rather than the run ending at the first that refuses.",
    },
    {
      invariantKind: "absence",
      statement: "No page is read here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing a name akasha keeps holds is taken.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing git keeps is reached.",
    },
  ],
} as const satisfies Module
