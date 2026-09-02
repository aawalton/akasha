import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const equipmentMappings = {
  id: "01a060af-2560-781d-b1ae-002d5f3fc42b",
  pageTypeSlug: "module",
  slug: "equipment-mappings",
  definition: "the small index each armour trait, weapon trait and quality is packed as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A game constant the tables do not name is packed as zero.",
    },
    {
      invariantKind: "departure",
      statement: "An index here is part of the wire format and never renumbered.",
    },
  ],
} as const satisfies Module
