import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerOfNimueDecisionCadence = {
  id: "01a0deeb-597e-7a95-9990-e3a8538c4aa0",
  type: "page-type/world-mechanic",
  slug: "tower-of-nimue-decision-cadence",
  title: "Decision Cadence",
  world: "world/tower-of-nimue",
  description:
    "The first decision comes at the threshold before floor 1. It fills slot 1 with a human baseline essence crystallized from who the climber was rather than harvested, and sets a stat lean and a starting playstyle. After that, every floor cleared brings a Harvest, the recurring decision: the System offers 2 or 3 essences and the reader picks one, free into an open slot or by permanent displacement when the slots are full. Every fifth floor brings a Stat Allocation, where the reader spends the 15 banked free points. Each Gatekeeper, at floors 10, 25, 50 and 75, brings a slot expansion and an Aspect crystallization.",
} as const satisfies WorldMechanic
