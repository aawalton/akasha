import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereXiAssassinsGuild = {
  id: "01a0ea89-4777-74b2-9c3d-690771c8c69e",
  type: "page-type/world-organization",
  slug: "otherwhere-xi-assassins-guild",
  title: "The Assassins' Guild of Helock",
  world: "world/the-calamitous-bob-stubbed",
  description: "A guild of hired killers based in Helock.",
} as const satisfies WorldOrganization
