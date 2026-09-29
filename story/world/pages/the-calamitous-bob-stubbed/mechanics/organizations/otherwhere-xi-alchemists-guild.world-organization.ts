import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereXiAlchemistsGuild = {
  id: "01a0ea89-4777-7419-83ab-f4a468e24ed1",
  type: "page-type/world-organization",
  slug: "otherwhere-xi-alchemists-guild",
  title: "The Alchemists' Guild",
  world: "world/the-calamitous-bob-stubbed",
  description: "The guild of Param's alchemists.",
} as const satisfies WorldOrganization
