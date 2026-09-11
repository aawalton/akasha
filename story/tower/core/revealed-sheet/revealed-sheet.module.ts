import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const revealedSheet = {
  id: "01a05bc6-fa4a-7003-aa68-8eca1b65046d",
  pageTypeSlug: "module",
  slug: "revealed-sheet",
  definition: "the shape of a character sheet as a player is shown it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A skill's displayed score sits in front of the score the skill was stored with.",
    },
    {
      invariantKind: "departure",
      statement: "An affinity is shown by the counter the affinity has reached.",
    },
    {
      invariantKind: "departure",
      statement: "A weapon is shown in the main hand.",
    },
    {
      invariantKind: "departure",
      statement: "Armour is shown in the cloak.",
    },
    {
      invariantKind: "absence",
      statement: "A sheet with neither weapon nor armour is shown with no equipment.",
    },
  ],
} as const satisfies Module
