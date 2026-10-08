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
  createdAt: "2026-09-28T21:36:25.682Z",
  updatedAt: "2026-09-28T21:36:28.000Z",
} as const satisfies WorldMechanic
