import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereVAdventurers = {
  id: "01a0e9f5-e1ae-759b-9999-41499545bb33",
  type: "page-type/world-organization",
  slug: "otherwhere-v-adventurers",
  title: "Adventurers",
  world: "world/ends-of-magic",
  aliases: ["the Adventurer's Guild"],
  description: "Mortal monster-hunters.",
} as const satisfies WorldOrganization
