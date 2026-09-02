import type { Module } from "@akasha/code-system/module"

export const savedVarsMigration = {
  id: "01a06072-5abc-78bd-a40d-4a0c330f4651",
  pageTypeSlug: "module",
  slug: "saved-vars-migration",
  definition: "a player's saved variables carried to the file the folded-together addon reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A migration runs only for the addon the migration names.",
    },
    {
      invariantKind: "departure",
      statement: "A rename writes the new file and leaves the old file alone.",
    },
    {
      invariantKind: "departure",
      statement: "A rename whose new file is already there is skipped.",
    },
    {
      invariantKind: "departure",
      statement: "A rename matching no global writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An append copies the target aside before writing the target.",
    },
    {
      invariantKind: "departure",
      statement: "An append whose target is absent is skipped rather than made.",
    },
    {
      invariantKind: "departure",
      statement: "A copy aside is made once rather than on every run.",
    },
    {
      invariantKind: "departure",
      statement: "An outcome that changed nothing is reported to nobody.",
    },
  ],
} as const satisfies Module
