import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const operator = {
  id: "01a053c5-8d2c-70e4-8a45-06368ddfc0ae",
  type: "page-type/role",
  slug: "operator",
  definition: "an agent keeping a domain's conditions true",
  onCall: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An operator asks their principal when the operator is not sure what act to take.",
    },
  ],
  createdAt: "2026-08-30T17:44:10.796Z",
  updatedAt: "2026-09-22T00:36:58.000Z",
} as const satisfies Role
