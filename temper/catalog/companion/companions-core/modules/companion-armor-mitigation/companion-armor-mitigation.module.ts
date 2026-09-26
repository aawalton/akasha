import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionArmorMitigation = {
  id: "01a0df1c-37d8-73aa-8277-0235fccae214",
  type: "page-type/module",
  slug: "companion-armor-mitigation",
  definition: "the share of damage a companion's armor, or an enemy's, stops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The divisor and cap armor is held to are read from the companion armor stat page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A companion armor stat that is not a rating is refused rather than given a divisor.",
    },
  ],
} as const satisfies Module
