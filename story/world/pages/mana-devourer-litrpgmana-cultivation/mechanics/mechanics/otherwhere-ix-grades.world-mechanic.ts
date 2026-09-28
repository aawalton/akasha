import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxGrades = {
  id: "01a0ea37-28a8-718b-9e38-9ff89ccb8487",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-grades",
  title: "Grades",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["mana grades", "grade"],
  description: "A letter scale from G up to SSS that rates the strength of mana and what holds it.",
} as const satisfies WorldMechanic
