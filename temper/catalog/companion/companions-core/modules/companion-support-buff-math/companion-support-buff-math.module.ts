import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSupportBuffMath = {
  id: "01a06152-c2d7-7695-9439-9870ccc2e399",
  type: "page-type/module",
  slug: "companion-support-buff-math",
  definition: "buff multiplier and crit chance arithmetic shared by the support evaluators",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Force buffs are scaled by crit chance while berserk buffs are not.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Only fractional-change buff values contribute to the damage delta.",
    },
  ],
} as const satisfies Module
