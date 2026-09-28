import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVStatus = {
  id: "01a0e9f2-c28b-70d4-a7d0-eef9cc222d10",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-status",
  title: "Status",
  world: "world/ends-of-magic",
  aliases: ["status box", "status sheet", "status screen"],
  description: "A box of a person's Talents, classes, levels, resources and skills.",
} as const satisfies WorldMechanic
