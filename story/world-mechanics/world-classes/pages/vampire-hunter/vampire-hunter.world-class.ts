import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const vampireHunter = {
  id: "01a06586-0a6e-75dd-a5d5-c6433c536501",
  type: "world-class",
  slug: "vampire-hunter",
  title: "Vampire Hunter",
  world: "the-wandering-inn",
  aliases: ["vampire-hunters"],
  evolvesFromSlugs: ["crossbow-speed-hunter"],
  references: "jsonl",
} as const satisfies WorldClass
