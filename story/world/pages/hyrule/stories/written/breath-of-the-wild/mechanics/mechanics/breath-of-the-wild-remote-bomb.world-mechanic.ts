import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const breathOfTheWildRemoteBomb = {
  id: "01a10331-b562-777b-be79-2911c9a07aac",
  type: "page-type/world-mechanic",
  slug: "breath-of-the-wild-remote-bomb",
  title: "Remote Bomb",
  world: "world/hyrule",
  description:
    "A Sheikah Slate rune that makes a round or cube bomb of blue light, set off from a distance.",
  unrevealed: false,
} as const satisfies WorldMechanic
