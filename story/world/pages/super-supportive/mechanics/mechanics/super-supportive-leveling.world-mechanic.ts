import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveLeveling = {
  id: "01a0e9f0-3dfb-7095-8113-a07880521d1a",
  type: "page-type/world-mechanic",
  slug: "super-supportive-leveling",
  title: "Leveling",
  world: "world/super-supportive",
  aliases: ["level up"],
  description: "The way an Avowed's talents grow, one level at a time.",
} as const satisfies WorldMechanic
