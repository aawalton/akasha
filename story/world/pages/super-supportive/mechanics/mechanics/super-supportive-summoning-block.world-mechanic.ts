import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSummoningBlock = {
  id: "01a0e9fb-2b66-74d6-b663-753b2c4defb5",
  type: "page-type/world-mechanic",
  slug: "super-supportive-summoning-block",
  title: "Summoning block",
  world: "world/super-supportive",
  aliases: ["service already assigned"],
  description:
    "A mark showing an Avowed's service is already assigned, so other wizards can't summon them.",
} as const satisfies WorldMechanic
