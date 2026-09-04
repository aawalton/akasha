import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const turnSchema = {
  id: "01a05b71-e544-7cd7-9ac0-579c810eb097",
  pageTypeSlug: "module",
  slug: "turn-schema",
  definition:
    "a turn's options, the standing it has reached, and the prose banked toward the next one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A turn counts as unpublished only while the turn is a draft.",
    },
  ],
} as const satisfies Module
