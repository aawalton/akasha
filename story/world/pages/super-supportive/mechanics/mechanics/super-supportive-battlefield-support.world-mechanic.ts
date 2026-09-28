import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveBattlefieldSupport = {
  id: "01a0e9f0-3dfa-7179-8d83-ad2ea3061fa0",
  type: "page-type/world-mechanic",
  slug: "super-supportive-battlefield-support",
  title: "Battlefield support",
  world: "world/super-supportive",
  aliases: ["sidekick", "support"],
  description:
    "A hero role specced to complement a partner through crowd control, barriers, buffs and damage mitigation.",
} as const satisfies WorldMechanic
