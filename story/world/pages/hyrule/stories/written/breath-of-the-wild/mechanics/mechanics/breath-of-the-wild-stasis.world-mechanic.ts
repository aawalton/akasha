import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const breathOfTheWildStasis = {
  id: "01a10331-b562-7915-b18b-c7c7d376dced",
  type: "page-type/world-mechanic",
  slug: "breath-of-the-wild-stasis",
  title: "Stasis",
  world: "world/hyrule",
  description:
    "A Sheikah Slate rune that freezes an object, never a living thing, in time for a few seconds, storing the force of blows struck on it.",
  unrevealed: false,
} as const satisfies WorldMechanic
