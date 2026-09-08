import type { Role } from "../role.page-type.ts"

export const companion = {
  id: "01a053c5-8d28-7a64-b583-0a00416d523b",
  pageTypeSlug: "role",
  slug: "companion",
  definition: "an agent keeping Alan company in a pursuit he keeps for its own sake",
  onCall: false,
} as const satisfies Role
