import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const prophetOfTheHolyPeople = {
  id: "01a0657e-0240-7806-820b-9f6a9145bfe6",
  type: "page-type/world-class",
  slug: "prophet-of-the-holy-people",
  title: "Prophet of the Holy People",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-class/witness-of-divinity"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.064Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
