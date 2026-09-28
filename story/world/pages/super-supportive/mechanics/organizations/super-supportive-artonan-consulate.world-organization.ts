import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveArtonanConsulate = {
  id: "01a0e9f1-bb28-7f01-86b0-d685dad94bc6",
  type: "page-type/world-organization",
  slug: "super-supportive-artonan-consulate",
  title: "Artonan consulate",
  world: "world/super-supportive",
  aliases: ["consulate"],
  description: "An Artonan office on Earth for registering and taking classes.",
} as const satisfies WorldOrganization
