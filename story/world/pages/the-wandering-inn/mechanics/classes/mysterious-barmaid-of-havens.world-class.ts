import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mysteriousBarmaidOfHavens = {
  id: "01a0657e-0234-7248-a172-0f825d98bc5b",
  type: "page-type/world-class",
  slug: "mysterious-barmaid-of-havens",
  title: "Mysterious Barmaid of Havens",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/boxhead-barmaid"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.052Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
