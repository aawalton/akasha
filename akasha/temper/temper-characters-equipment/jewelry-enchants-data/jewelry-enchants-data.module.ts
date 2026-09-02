import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const jewelryEnchantsData = {
  id: "01a0616f-8e14-79ec-a8cd-c4989b33053d",
  pageTypeSlug: "module",
  slug: "jewelry-enchants-data",
  definition: "the table of jewelry glyphs, kept apart from the module that reads the table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is written out from the glyph pages rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "This table is a file of its own.",
    },
    {
      invariantKind: "constraint",
      statement: "A glyph's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A glyph moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
