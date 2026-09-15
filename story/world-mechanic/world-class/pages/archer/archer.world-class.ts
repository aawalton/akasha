import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const archer = {
  id: "01a0657e-132e-7148-aec3-ee811a9dea78",
  type: "world-class",
  slug: "archer",
  title: "Archer",
  world: "world/the-wandering-inn",
  aliases: ["archers"],
  evolvesToSlugs: ["sniper"],
  references: "jsonl",
} as const satisfies WorldClass
