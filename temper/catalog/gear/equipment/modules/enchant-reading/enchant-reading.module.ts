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
  ],
} as const satisfies Module
