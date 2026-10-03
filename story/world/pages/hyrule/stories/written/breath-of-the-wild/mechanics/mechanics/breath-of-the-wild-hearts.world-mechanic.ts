import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const breathOfTheWildHearts = {
  id: "01a10331-b562-7ba7-bd3e-18438e2a2558",
  type: "page-type/world-mechanic",
  slug: "breath-of-the-wild-hearts",
  title: "Hearts",
  world: "world/hyrule",
  description:
    "Link's health, shown on the Slate as hearts of four quarters each; blows and cold take quarters, and food gives them back up to his full hearts.",
} as const satisfies WorldMechanic
