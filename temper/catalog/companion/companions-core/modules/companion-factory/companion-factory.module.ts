import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionFactory = {
  id: "01a06152-c2c8-7e6d-b07f-b8d4a1e94f30",
  type: "page-type/module",
  slug: "companion-factory",
  definition:
    "factory for new and empty companion build states with role-derived default equipment",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Default weapons for a damage role are drawn at random rather than fixed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty companion has armor items of no-weight rather than empty slots.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every role-derived equipment piece is created at epic quality.",
    },
  ],
  createdAt: "2026-09-02T08:53:28.904Z",
  updatedAt: "2026-09-21T15:26:51.000Z",
} as const satisfies Module
