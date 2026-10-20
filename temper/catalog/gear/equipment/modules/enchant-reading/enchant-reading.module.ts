import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const enchantReading = {
  id: "01a0e107-cf3c-7482-bded-1ed7ecba215f",
  type: "page-type/module",
  slug: "enchant-reading",
  definition: "the armor, weapon and jewelry glyphs and what each gives, read from their pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The glyphs are read from the enchant pages in hash-place order and held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A glyph's effects at a quality are asked of the graded effects the gear reading holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glyph's numbers come from the game's glyph grades where the grades hold them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glyph naming no subtype takes the champion 160 subtype of its quality.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glyph below subtype 228 is found by its subtype and its glyph level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number no grade names at legendary is scaled as the grade's first number is.",
    },
  ],
  createdAt: "2026-09-27T04:03:00.540Z",
  updatedAt: "2026-10-20T17:45:44.331Z",
} as const satisfies Module
