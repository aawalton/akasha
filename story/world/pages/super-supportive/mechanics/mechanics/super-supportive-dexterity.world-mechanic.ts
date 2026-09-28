import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveDexterity = {
  id: "01a0e9f7-dffa-7088-8b46-9d9b42670102",
  type: "page-type/world-mechanic",
  slug: "super-supportive-dexterity",
  title: "Dexterity",
  world: "world/super-supportive",
  aliases: ["dexterity stats"],
  description: "A physical stat for fine control of the hands and body.",
} as const satisfies WorldMechanic
