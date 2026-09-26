import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEffectReading = {
  id: "01a0df26-d2d8-7c60-9c21-334517d219a0",
  type: "page-type/module",
  slug: "companion-effect-reading",
  definition:
    "the buff and debuff facts the companion catalogue holds, built from their pages' rows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads a page, so the caller hands in the rows of each page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff or debuff has a value here only when its page states exactly one effect.",
    },
  ],
} as const satisfies Module
