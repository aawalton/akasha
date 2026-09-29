import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereIvMagic = {
  id: "01a0ed28-3fb2-7904-b297-104670e719ce",
  type: "page-type/world-mechanic",
  slug: "overwhere-iv-magic",
  title: "Magic",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "Mana shaped into spells through a person's affinities.",
} as const satisfies WorldMechanic
