import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const reviewer = {
  id: "01a0debc-6738-73fb-9f06-f8d1967f9d96",
  type: "page-type/role",
  slug: "reviewer",
  definition: "an agent that checks one played turn's beats as one story reviewer",
  onCall: false,
} as const satisfies Role
