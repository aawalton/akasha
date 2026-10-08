import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const worker = {
  id: "01a053c5-8d2d-7022-928e-ef1f1da1b0c4",
  type: "page-type/role",
  slug: "worker",
  definition: "an agent that does the work sent to its seat",
  onCall: false,
  createdAt: "2026-08-30T17:44:10.797Z",
  updatedAt: "2026-09-25T18:04:09.000Z",
} as const satisfies Role
