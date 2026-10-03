import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const breathOfTheWildSheikahSlate = {
  id: "01a10331-b562-75b0-b89e-24a4cea73a3d",
  type: "page-type/world-mechanic",
  slug: "breath-of-the-wild-sheikah-slate",
  title: "The Sheikah Slate",
  world: "world/hyrule",
  description:
    "A Sheikah tablet that shows its holder's hearts, stamina wheels, runes, map and Spirit Orbs as short boxed screens, and chimes when they change.",
} as const satisfies WorldMechanic
