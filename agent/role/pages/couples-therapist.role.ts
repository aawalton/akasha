import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const couplesTherapist = {
  id: "01a16edd-ac13-7003-8865-8d3989daed78",
  type: "page-type/role",
  slug: "couples-therapist",
  definition: "an agent that holds a couple's therapy sessions with both spouses",
  onCall: true,
  createdAt: "2026-10-24T17:03:03.699Z",
  updatedAt: "2026-10-24T17:03:03.699Z",
} as const satisfies Role
