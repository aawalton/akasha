import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const weaponEnchants = {
  id: "01a0616f-8e18-7979-89eb-61f1621f3cdb",
  pageTypeSlug: "module",
  slug: "weapon-enchants",
  definition: "every glyph a weapon takes, and what each is worth at a quality",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the glyph pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A glyph's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A glyph moved to another place breaks every build hash saved.",
    },
    {
      invariantKind: "upkeep",
      statement: "The generator writes this table outside akasha.",
    },
    {
      invariantKind: "upkeep",
      statement: "Both copies of this table move together.",
    },
  ],
} as const satisfies Module
