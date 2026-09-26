import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerOfNimueLeveling = {
  id: "01a0deeb-597e-7fbb-b4c2-a2fcab9f34a3",
  type: "page-type/world-mechanic",
  slug: "tower-of-nimue-leveling",
  title: "Leveling",
  world: "world/tower-of-nimue",
  description:
    "A climber's level is the floors cleared plus one: a climber starts at level 1, and clearing floor 10 makes level 11. Each level raises every stat by 1 on its own and banks 3 free points, which the climber spends at the Stat Allocation every fifth floor. Essences are the other way a climber grows, adding abilities and passives on top of the stats.",
} as const satisfies WorldMechanic
