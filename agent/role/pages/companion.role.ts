import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const companion = {
  id: "01a053c5-8d28-7a64-b583-0a00416d523b",
  type: "page-type/role",
  slug: "companion",
  definition: "an agent that does fun things with Alan",
  onCall: false,
  createdAt: "2026-08-30T17:44:10.792Z",
  updatedAt: "2026-09-25T18:01:37.000Z",
} as const satisfies Role
