import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const superSupportiveAlliedHeroesOfEarth = {
  id: "01a0e9f1-bb27-7341-97f2-6d432dc97b93",
  type: "page-type/world-organization",
  slug: "super-supportive-allied-heroes-of-earth",
  title: "Allied Heroes of Earth",
  world: "world/super-supportive",
  aliases: ["Associated Heroes of Earth", "AHE"],
  description: "The group that owns Anesidora and other hero zones.",
} as const satisfies WorldOrganization
