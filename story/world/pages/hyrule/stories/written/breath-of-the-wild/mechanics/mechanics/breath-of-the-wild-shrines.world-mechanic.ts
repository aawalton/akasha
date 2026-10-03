import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const breathOfTheWildShrines = {
  id: "01a10331-b562-7928-8ce0-987fd52d0477",
  type: "page-type/world-mechanic",
  slug: "breath-of-the-wild-shrines",
  title: "Shrines of Trials",
  world: "world/hyrule",
  description:
    "Sheikah shrines opened by the Slate, each a trial ending at a monk who gives a Spirit Orb; four orbs at a Goddess Statue buy a Heart Container or a stamina vessel.",
} as const satisfies WorldMechanic
