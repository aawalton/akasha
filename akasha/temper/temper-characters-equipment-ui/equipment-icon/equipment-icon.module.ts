import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const equipmentIcon = {
  id: "01a06333-1bba-7ed5-888a-b5a3ca70eacf",
  pageTypeSlug: "module",
  slug: "equipment-icon",
  definition: "the picture that represents one piece of equipment",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A picture that fails to load is replaced rather than left broken.",
    },
  ],
} as const satisfies Module
