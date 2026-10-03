import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const towerAndTheStarBonds = {
  id: "01a1033f-b3b4-7798-9a34-cedd2c81e44d",
  type: "page-type/world-mechanic",
  slug: "tower-and-the-star-bonds",
  title: "Bonds",
  world: "world/tower-and-the-star",
  description:
    "Harmony Aspects are modes of connection the System measures: Steadfast, Warmhearted, Openhanded, Clearvoiced, Brightspirit and Trueweave. Two bearers acting together unlock a Harmony Skill, and strength scales with bond depth. The System counts the party's Resonance Events toward a threshold of 150, where Six of Six unlocks.",
} as const satisfies WorldMechanic
