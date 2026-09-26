import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theTowerDeathLoop = {
  id: "01a0dec3-f567-78c1-b9fb-f115d9952ba1",
  type: "page-type/world-mechanic",
  slug: "the-tower-death-loop",
  title: "Death Loop",
  world: "world/personas",
} as const satisfies WorldMechanic
