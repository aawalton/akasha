import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spearWarrior = {
  id: "01a0657e-025d-707c-b9ef-f888fd779f3d",
  type: "page-type/world-class",
  slug: "spear-warrior",
  title: "Spear Warrior",
  world: "world/the-wandering-inn",
  aliases: ["Spear…Warrior"],
  references: "jsonl",
} as const satisfies WorldClass
