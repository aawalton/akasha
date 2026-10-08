import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const survivor = {
  id: "01a0657e-0262-778c-ae82-163484d094b4",
  type: "page-type/world-class",
  slug: "survivor",
  title: "Survivor",
  world: "world/the-wandering-inn",
  appearanceCount: 23,
  aliases: ["survivors"],
  evolvesToSlugs: ["world-class/underworld-survivor"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.098Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
