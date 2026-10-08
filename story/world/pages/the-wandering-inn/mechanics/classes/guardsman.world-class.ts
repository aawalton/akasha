import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const guardsman = {
  id: "01a0657e-01ed-7631-8a98-bf20ca10276e",
  type: "page-type/world-class",
  slug: "guardsman",
  title: "Guardsman",
  world: "world/the-wandering-inn",
  appearanceCount: 181,
  evolvesToSlugs: ["world-class/shield-companion"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.981Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
