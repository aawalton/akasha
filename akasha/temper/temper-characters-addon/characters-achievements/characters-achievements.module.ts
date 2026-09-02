import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersAchievements = {
  id: "01a062e9-b6ff-701b-ad38-42cae450de18",
  pageTypeSlug: "module",
  slug: "characters-achievements",
  definition:
    "every achievement's progress, read into the saved table under the account or the character",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "The game says of each achievement whether it is kept per character or per account.",
    },
  ],
} as const satisfies Module
