import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillTokenGuard = {
  id: "01a06983-278f-7783-8ab5-b3999bf58fcb",
  type: "page-type/module",
  slug: "skill-token-guard",
  definition: "how code rejects a prompt that starts with a slash command",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names this module by its slug rather than by its path.",
    },
  ],
  createdAt: "2026-09-03T23:03:18.159Z",
  updatedAt: "2026-10-22T15:09:52.895Z",
} as const satisfies Module
