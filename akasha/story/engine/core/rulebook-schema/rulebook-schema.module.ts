import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const rulebookSchema = {
  id: "01a05b71-e544-70e3-9bbf-39b05dfb3b6d",
  pageTypeSlug: "module",
  slug: "rulebook-schema",
  definition: "a game's mechanics, from its attributes through its dice to how a strike resolves",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rulebook is read out of the mechanics key of what a game declares.",
    },
  ],
} as const satisfies Module
