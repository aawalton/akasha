import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveHouseOfHealing = {
  id: "01a0e9f1-bb28-7666-b7e0-150b4c9e1297",
  type: "page-type/world-organization",
  slug: "super-supportive-house-of-healing",
  title: "House of Healing",
  world: "world/super-supportive",
  aliases: ["Artonan House of Healing"],
  description: "An Artonan hospital that treats superpower injuries.",
} as const satisfies WorldOrganization
