import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const writer = {
  id: "01a0debc-6739-78f9-980f-5b2633b9f9d1",
  type: "page-type/role",
  slug: "writer",
  definition: "an agent that writes one played turn's prose from its beats",
  onCall: false,
} as const satisfies Role
