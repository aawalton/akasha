import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionSupportBuffMath = {
  id: "01a06152-c2d7-7695-9439-9870ccc2e399",
  pageTypeSlug: "module",
  slug: "companion-support-buff-math",
  definition: "buff multiplier and crit chance arithmetic shared by the support evaluators",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Force buffs are scaled by crit chance while berserk buffs are not.",
    },
    {
      invariantKind: "constraint",
      statement: "Only fractional-change buff values contribute to the damage delta.",
    },
    {
      invariantKind: "gap",
      statement: "A non-rating critical chance metric yields zero crit chance.",
    },
  ],
} as const satisfies Module
