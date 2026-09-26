import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionArmorBaseValues = {
  id: "01a06152-c2c3-745e-9ada-68a8820c6c2f",
  type: "page-type/module",
  slug: "companion-armor-base-values",
  definition: "armor value lookup by companion armor weight and equipment quality",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An armor value is read from the quality page it belongs to.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A no-quality or no-weight argument returns zero armor.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The lookup defaults to legendary quality when no quality is passed.",
    },
  ],
} as const satisfies Module
