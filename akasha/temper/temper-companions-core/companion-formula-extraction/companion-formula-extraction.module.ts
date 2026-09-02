import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionFormulaExtraction = {
  id: "01a06152-c2c8-7340-b909-f5fd7c81e388",
  pageTypeSlug: "module",
  slug: "companion-formula-extraction",
  definition: "the damage and healing components a companion skill template breaks down into",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Trigger frequency is folded into a component's value rather than simulated over time.",
    },
    {
      invariantKind: "constraint",
      statement: "A component identifier counts up across one extraction run.",
    },
    {
      invariantKind: "gap",
      statement:
        "Component values are worked out from base companion stats rather than the build being scored.",
    },
  ],
} as const satisfies Module
