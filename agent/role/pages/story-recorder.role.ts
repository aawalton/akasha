import type { Role } from "akasha/agent/role/role.page-type.types.ts"

export const storyRecorder = {
  id: "01a0e054-86e2-7a7c-8bf7-dda0c72d035a",
  type: "page-type/role",
  slug: "story-recorder",
  definition: "an agent that drafts into pages what one played turn changed, as one story recorder",
  onCall: false,
} as const satisfies Role
