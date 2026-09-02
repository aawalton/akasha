import type { Module } from "@akasha/code-system/module"

export const characterCaptureSkillLineGroups = {
  id: "01a0616b-aaf2-7d29-bf88-e33b5830c654",
  pageTypeSlug: "module",
  slug: "character-capture-skill-line-groups",
  definition: "which skill lines belong to each class, each race, and the base game",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A place in this table is the number a saved build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "An entry moved to another place misreads every build hash already saved.",
    },
  ],
} as const satisfies Module
