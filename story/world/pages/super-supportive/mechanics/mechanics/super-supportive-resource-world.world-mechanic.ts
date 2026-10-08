import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveResourceWorld = {
  id: "01a0e9f2-9a52-703f-a85e-7575a2e0bfdc",
  type: "page-type/world-mechanic",
  slug: "super-supportive-resource-world",
  title: "Resource world",
  world: "world/super-supportive",
  aliases: ["Artonan resource world"],
  description: "A planet under Artonan magic and protection that supplies people for the Contract.",
  createdAt: "2026-09-28T21:36:25.682Z",
  updatedAt: "2026-09-28T21:36:28.000Z",
} as const satisfies WorldMechanic
