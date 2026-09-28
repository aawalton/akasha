import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const otherwhereVQuestorGrids = {
  id: "01a0e9fb-e182-799f-a2f7-0fa28967e72e",
  type: "page-type/world-organization",
  slug: "otherwhere-v-questor-grids",
  title: "Questor Grids",
  world: "world/ends-of-magic",
  aliases: ["grids", "the game of Questors"],
  description: "Alliances of Questors.",
} as const satisfies WorldOrganization
