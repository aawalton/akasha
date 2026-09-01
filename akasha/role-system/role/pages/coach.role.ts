import type { Role } from "../role.page-type.ts"

export const coach = {
  id: "01a053c5-8d28-756b-8e9c-27ee6552463a",
  pageTypeSlug: "role",
  slug: "coach",
  definition: "an agent helping one person improve their own practice",
  onCall: false,
} as const satisfies Role
