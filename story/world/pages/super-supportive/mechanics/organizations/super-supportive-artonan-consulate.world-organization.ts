import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveArtonanConsulate = {
  id: "01a0e9f1-bb28-7f01-86b0-d685dad94bc6",
  type: "page-type/world-organization",
  slug: "super-supportive-artonan-consulate",
  title: "Artonan consulate",
  world: "world/super-supportive",
  aliases: ["consulate"],
  description: "An Artonan office on Earth for registering and taking classes.",
  createdAt: "2026-09-28T21:35:28.552Z",
  updatedAt: "2026-09-28T21:35:31.000Z",
} as const satisfies WorldOrganization
