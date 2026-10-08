import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const coach = {
  id: "01a053c5-8d28-756b-8e9c-27ee6552463a",
  type: "page-type/role",
  slug: "coach",
  definition: "an agent that guides a person in what the person does",
  onCall: false,
  createdAt: "2026-08-30T17:44:10.792Z",
  updatedAt: "2026-09-25T18:01:21.000Z",
} as const satisfies Role
