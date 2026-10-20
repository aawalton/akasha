import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureEnchantQuality = {
  id: "01a0616b-9b51-721f-941f-564f2f6934aa",
  type: "page-type/module",
  slug: "character-capture-enchant-quality",
  definition: "the quality and subtype of the glyph an item link names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A link naming no subtype, or one past what nine bits hold, gives a subtype of zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A glyph's level is the link's field after its glyph subtype, and zero past six bits.",
    },
  ],
  createdAt: "2026-09-02T09:20:37.201Z",
  updatedAt: "2026-10-20T17:52:00.424Z",
} as const satisfies Module
