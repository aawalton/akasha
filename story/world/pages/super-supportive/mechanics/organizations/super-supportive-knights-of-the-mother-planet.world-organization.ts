import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveKnightsOfTheMotherPlanet = {
  id: "01a0e9f1-bb28-744a-bed0-5a5d95efeb99",
  type: "page-type/world-organization",
  slug: "super-supportive-knights-of-the-mother-planet",
  title: "Knights of the Mother Planet",
  world: "world/super-supportive",
  aliases: ["knights", "the Numbered Ones"],
  description: "Artonan wizards sworn to guard the Triplanets from chaos and demons.",
} as const satisfies WorldOrganization
