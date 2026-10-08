import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillTokenGuard = {
  id: "01a06983-278f-7783-8ab5-b3999bf58fcb",
  type: "page-type/module",
  slug: "skill-token-guard",
  definition: "a prompt opening with a retired slash-skill token, refused",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names this module by its slug rather than by its path.",
    },
  ],
  createdAt: "2026-09-03T23:03:18.159Z",
  updatedAt: "2026-09-24T15:40:45.000Z",
} as const satisfies Module
