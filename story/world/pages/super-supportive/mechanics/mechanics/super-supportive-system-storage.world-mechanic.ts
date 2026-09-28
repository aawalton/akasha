import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSystemStorage = {
  id: "01a0e9f2-9a52-723a-9980-e73c2ed60452",
  type: "page-type/world-mechanic",
  slug: "super-supportive-system-storage",
  title: "System warehouses",
  world: "world/super-supportive",
  aliases: ["System storage"],
  description:
    "System storage that holds purchases and belongings and can teleport them to their owner.",
} as const satisfies WorldMechanic
