import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveChaos = {
  id: "01a0e9f1-cfc1-72d8-ae80-0f477e260695",
  type: "page-type/world-mechanic",
  slug: "super-supportive-chaos",
  title: "Chaos",
  world: "world/super-supportive",
  aliases: ["magi-chaos", "corruption"],
  description: "The disorder demons come from, which breaks down things and reality.",
} as const satisfies WorldMechanic
