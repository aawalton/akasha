import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const actress = {
  id: "01a0657e-1325-784f-b619-da63a7e00a97",
  type: "page-type/world-class",
  slug: "actress",
  title: "Actress",
  world: "world/the-wandering-inn",
  appearanceCount: 9,
  evolvesToSlugs: ["world-class/lead-actress"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.389Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
