import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const coach = {
  id: "01a053c5-8d28-756b-8e9c-27ee6552463a",
  type: "page-type/role",
  slug: "coach",
  definition: "an agent that guides a person in what the person does",
  onCall: false,
} as const satisfies Role
