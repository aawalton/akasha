import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersGlyphProbe = {
  id: "01a13b1f-2659-7566-98f3-76345cada83e",
  type: "page-type/module",
  slug: "characters-glyph-probe",
  definition:
    "the enchantment each glyph gives at each subtype, written to the saved table to be looked at",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This probe stays only until the build hash carries the glyph level.",
    },
  ],
  createdAt: "2026-10-14T15:54:19.608Z",
  updatedAt: "2026-10-14T16:02:33.139Z",
} as const satisfies Module
