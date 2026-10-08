import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionWeaponRoles = {
  id: "01a06108-076e-73a3-92eb-0f178131ebd0",
  type: "page-type/module",
  slug: "companion-weapon-roles",
  definition: "every pairing of weapons a companion is built around",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon role is read from its page rather than from a copy in code.",
    },
  ],
  createdAt: "2026-09-02T07:31:51.278Z",
  updatedAt: "2026-09-26T16:23:19.000Z",
} as const satisfies Module
