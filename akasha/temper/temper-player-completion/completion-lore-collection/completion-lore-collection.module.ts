import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionLoreCollection = {
  id: "01a06108-2ff0-7e1d-a87a-92a78e75108a",
  pageTypeSlug: "module",
  slug: "completion-lore-collection",
  definition: "the first lore collection a character has yet to read out",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Collections and books are sorted by name rather than by index.",
    },
  ],
} as const satisfies Module
