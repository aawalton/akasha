import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const nextSet = {
  id: "01a0685e-89d5-795b-8835-93a46e4f0f62",
  pageTypeSlug: "module",
  slug: "next-set",
  definition: "what to do next in a session under way, read from what has been logged so far",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A movement is done once its prescribed sets are logged.",
    },
    {
      invariantKind: "departure",
      statement: "A set at RPE nine or above ends the movement.",
    },
    {
      invariantKind: "departure",
      statement: "A set falling below the range floor ends the movement.",
    },
    {
      invariantKind: "departure",
      statement: "A movement skipped after work was logged is done rather than excluded.",
    },
    {
      invariantKind: "departure",
      statement: "A movement skipped before any work is excluded from the session.",
    },
    {
      invariantKind: "departure",
      statement: "The next set says why the movement before it ended, unless it simply finished.",
    },
    {
      invariantKind: "departure",
      statement: "A session with every slot done prescribes nothing further.",
    },
  ],
} as const satisfies Module
