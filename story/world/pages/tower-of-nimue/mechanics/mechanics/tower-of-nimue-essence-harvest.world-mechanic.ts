import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerOfNimueEssenceHarvest = {
  id: "01a0deeb-597e-776d-aa99-558aca8affe5",
  type: "page-type/world-mechanic",
  slug: "tower-of-nimue-essence-harvest",
  title: "Essence Harvest",
  world: "world/tower-of-nimue",
  description:
    "The System has no classes. Every floor's trial is an apex creature, and on the kill the System offers the climber essences to harvest from the slain, such as its venom, its speed or its molten blood; the climber takes one. Essences occupy a small fixed set of slots, so a climber's build is a chimera stitched from everything they have killed. The higher a climber's ATT, the better and the more essence options a kill offers.",
} as const satisfies WorldMechanic
