import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftTooltips = {
  id: "01a061c7-e873-7c19-8c66-b25311e7c967",
  type: "page-type/module",
  slug: "craft-tooltips",
  definition: "what this add-on adds to an item tooltip",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item tooltip counts the characters that still need the item rather than naming them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count says where the character playing is one of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The research grid at a crafting station names the characters.",
    },
  ],
  createdAt: "2026-09-02T11:01:26.259Z",
  updatedAt: "2026-10-20T00:28:24.162Z",
} as const satisfies Module
