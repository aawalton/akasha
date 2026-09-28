import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveSuperlatives = {
  id: "01a0e9f9-c6a4-7ae6-b321-78bf6520b708",
  type: "page-type/world-organization",
  slug: "super-supportive-superlatives",
  title: "The Superlatives",
  world: "world/super-supportive",
  aliases: ["Superlatives"],
  description: "A club for S-rank students.",
} as const satisfies WorldOrganization
