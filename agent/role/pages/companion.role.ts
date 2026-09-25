import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const companion = {
  id: "01a053c5-8d28-7a64-b583-0a00416d523b",
  type: "page-type/role",
  slug: "companion",
  definition: "an agent that does fun things with Alan",
  onCall: false,
} as const satisfies Role
