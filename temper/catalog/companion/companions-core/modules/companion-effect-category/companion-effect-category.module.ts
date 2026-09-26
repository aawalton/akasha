import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEffectCategory = {
  id: "01a06110-abe2-7b21-a74e-6ed1a80f6081",
  type: "page-type/module",
  slug: "companion-effect-category",
  definition: "a companion skill effect's category",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff or debuff's category is read from its page, and none stated is utility.",
    },
  ],
} as const satisfies Module
