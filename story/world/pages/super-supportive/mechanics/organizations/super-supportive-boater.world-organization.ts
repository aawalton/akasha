import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveBoater = {
  id: "01a0e9f1-bb28-7260-9894-042851aa9dc1",
  type: "page-type/world-organization",
  slug: "super-supportive-boater",
  title: "Boater",
  world: "world/super-supportive",
  aliases: ["the boater"],
  description: "A club of people who recommend each other for Triplanet jobs.",
  createdAt: "2026-09-28T21:35:28.552Z",
  updatedAt: "2026-09-28T21:35:31.000Z",
} as const satisfies WorldOrganization
