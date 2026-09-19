import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const studentsOfPomle = {
  id: "01a0657e-0261-7f87-867b-7611cfcd6314",
  type: "page-type/world-class",
  slug: "students-of-pomle",
  title: "Students of Pomle",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
