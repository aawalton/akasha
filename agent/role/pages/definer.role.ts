import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const definer = {
  id: "01a053c5-8d29-7025-8439-5c119ee2f12d",
  type: "page-type/role",
  slug: "definer",
  definition: "an agent that writes domains with Alan",
  onCall: false,
  createdAt: "2026-08-30T17:44:10.793Z",
  updatedAt: "2026-09-25T18:02:02.000Z",
} as const satisfies Role
