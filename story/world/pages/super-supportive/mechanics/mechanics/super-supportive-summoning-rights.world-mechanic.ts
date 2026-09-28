import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSummoningRights = {
  id: "01a0e9f1-cfc2-7f1e-b530-0e96210d73c1",
  type: "page-type/world-mechanic",
  slug: "super-supportive-summoning-rights",
  title: "Summoning rights",
  world: "world/super-supportive",
  aliases: ["Contract access"],
  description: "A wizard's permission to summon Avowed.",
} as const satisfies WorldMechanic
