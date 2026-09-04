import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const rollback = {
  id: "01a05b71-e544-7ea7-9ac5-f593e5311a0b",
  pageTypeSlug: "module",
  slug: "rollback",
  definition: "the decision to carry a game back to a chosen turn and what it would touch",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rollback is refused whole where any one page cannot be restored exactly.",
    },
    {
      invariantKind: "departure",
      statement: "An entity made after the target turn is deleted rather than restored.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal reports the earliest turn a rollback could still reach.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is written here.",
    },
  ],
} as const satisfies Module
