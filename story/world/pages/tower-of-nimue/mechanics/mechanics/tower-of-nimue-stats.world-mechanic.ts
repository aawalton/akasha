import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerOfNimueStats = {
  id: "01a0deeb-597e-7608-91f2-3091917a6e29",
  type: "page-type/world-mechanic",
  slug: "tower-of-nimue-stats",
  title: "Stats",
  world: "world/tower-of-nimue",
  description:
    "A climber has five stats, each starting at 10. VIT is survival and sets HP. PWR is force: it sets the basic strike and scales essence active abilities. SPD is turn order, evasion and attack rate, which is kiting and fleeing for a solo climber. ATT is the essence stat: it sets Focus, the resource active essences spend, and governs essence potency, integration stability and harvest quality. INS is perception, critical hits and reading a weakness: the edge of the interface only the climber can see.",
} as const satisfies WorldMechanic
