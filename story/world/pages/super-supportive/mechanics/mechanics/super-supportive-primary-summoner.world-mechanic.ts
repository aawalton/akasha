import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportivePrimarySummoner = {
  id: "01a0e9f1-cfc2-790e-83cf-a81adb3cbac2",
  type: "page-type/world-mechanic",
  slug: "super-supportive-primary-summoner",
  title: "Primary summoner",
  world: "world/super-supportive",
  description: "The summoner whose quests take precedence over other summoners' quests.",
} as const satisfies WorldMechanic
