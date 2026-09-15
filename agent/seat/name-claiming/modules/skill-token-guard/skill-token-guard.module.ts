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
} as const satisfies Module
