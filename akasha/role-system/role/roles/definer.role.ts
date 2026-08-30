import type { Role } from "../role.page-type.ts"

export const definer = {
  id: "01a053c5-8d29-7025-8439-5c119ee2f12d",
  pageTypeSlug: "role",
  slug: "definer",
  definition: "an agent settling with Alan what a domain is and becomes",
  onCall: false,
} as const satisfies Role
