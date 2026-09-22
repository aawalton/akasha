import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsConstants = {
  id: "01a0611d-84d2-779b-a879-d2363a90342d",
  type: "page-type/module",
  slug: "companions-constants",
  definition:
    "the names the companion code registers under and the shape its saved table starts out as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every event name the companion code registers is built from the add-on name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The companion saved table keeps the name the game already persists it under.",
    },
  ],
} as const satisfies Module
