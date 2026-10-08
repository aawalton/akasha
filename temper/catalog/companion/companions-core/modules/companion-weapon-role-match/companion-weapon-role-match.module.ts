import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionWeaponRoleMatch = {
  id: "01a06152-c2d9-702b-a7bf-5b763c5df9fa",
  type: "page-type/module",
  slug: "companion-weapon-role-match",
  definition: "the pairing of a companion's two equipped weapons with a weapon role",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon role is read back from the weapons rather than stored on the build.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A build whose weapons match no role reads as the no-weapon-role entry.",
    },
  ],
  createdAt: "2026-09-02T08:53:28.921Z",
  updatedAt: "2026-09-21T15:26:51.000Z",
} as const satisfies Module
