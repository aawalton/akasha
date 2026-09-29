import type { WorldOrganization } from "akasha/story/world/mechanics/organizations/world-organization.page-type.types.ts"

export const overwhereIvAdventurersGuild = {
  id: "01a0ed31-9af3-79f3-8e8d-2b722c7f532f",
  type: "page-type/world-organization",
  slug: "overwhere-iv-adventurers-guild",
  title: "Adventurers Guild",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "The guild of monster hunters, dungeon delvers and quest takers across the human lands.",
} as const satisfies WorldOrganization
