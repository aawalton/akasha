import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveGrandSenate = {
  id: "01a0e9f1-bb28-7c8b-9dc1-05b9439171a7",
  type: "page-type/world-organization",
  slug: "super-supportive-grand-senate",
  title: "Grand Senate",
  world: "world/super-supportive",
  description: "The Artonan senate.",
} as const satisfies WorldOrganization
