import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionRotationResults = {
  id: "01a06152-c2cf-7e15-a652-e564d4083d72",
  type: "page-type/module",
  slug: "companion-rotation-results",
  definition: "the totals a finished companion rotation adds up to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Damage is totalled from extracted formula components rather than from timeline events.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Uptime past the end of the cycle is trimmed off before the ratio is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A critical hit adds the critical damage stat, whose base comes from its base stat page.",
    },
  ],
  createdAt: "2026-09-02T08:53:28.911Z",
  updatedAt: "2026-09-26T19:11:05.000Z",
} as const satisfies Module
