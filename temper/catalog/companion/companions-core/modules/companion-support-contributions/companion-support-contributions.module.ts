import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSupportContributions = {
  id: "01a06152-c2d7-7218-a6b1-632b35f18a49",
  type: "page-type/module",
  slug: "companion-support-contributions",
  definition: "support damage and toughness contributions derived from ally-visible buff uptimes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The damage contribution holds remaining armor to the companion armor stat page's divisor and cap.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Only buffs aimed at an ally-visible target enter the uptime list.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A debuff counts only when the effect targets an enemy.",
    },
  ],
  createdAt: "2026-09-02T08:53:28.919Z",
  updatedAt: "2026-09-26T19:06:11.000Z",
} as const satisfies Module
