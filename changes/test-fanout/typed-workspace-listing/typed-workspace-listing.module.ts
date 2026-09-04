import type { Module } from "@akasha/code-system/module"

export const typedWorkspaceListing = {
  id: "01a0685e-023f-7019-8ded-f546fa288874",
  pageTypeSlug: "module",
  slug: "typed-workspace-listing",
  definition: "the workspace roots bearing a test of one type, one to a line",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A test type the check workflow does not name is refused rather than answered empty.",
    },
    {
      invariantKind: "departure",
      statement: "A root is said on a line of its own so the shell can fan out over the lines.",
    },
  ],
} as const satisfies Module
