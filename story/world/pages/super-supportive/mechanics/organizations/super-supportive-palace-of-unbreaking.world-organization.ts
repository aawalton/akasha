import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportivePalaceOfUnbreaking = {
  id: "01a0e9f9-c6a3-713a-b221-1d2732024223",
  type: "page-type/world-organization",
  slug: "super-supportive-palace-of-unbreaking",
  title: "Palace of Unbreaking",
  world: "world/super-supportive",
  aliases: ["the Palace", "House of the Southern Convocation"],
  description: "An Artonan body that preserves wordchains and employs Chainers.",
} as const satisfies WorldOrganization
