import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const glyphGrades = {
  id: "01a13b2f-3fa9-7a8a-a4b6-231f00939dd6",
  type: "page-type/data-table",
  slug: "glyph-grades",
  definition: "the numbers each enchantment gives at each glyph grade, as the game reports them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A glyph grade is the set of item link subtypes the game gives the same values.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade's numbers are in the order the game's enchantment text states them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The numbers were read from the game's text for each glyph on a gear piece.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The subtypes from 228 up are kept by grade, where gear at the level cap sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Below 228 a glyph is kept by its subtype and its glyph level together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glyph below 228 is kept only once a character sheet has shown its number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the enchantments a stat is worked out from are kept.",
    },
  ],
  createdAt: "2026-10-14T16:11:54.664Z",
  updatedAt: "2026-10-20T17:45:44.331Z",
} as const satisfies DataTable
