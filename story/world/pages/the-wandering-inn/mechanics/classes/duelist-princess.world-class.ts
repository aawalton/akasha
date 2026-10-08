import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const duelistPrincess = {
  id: "01a0657e-01d5-7bd2-8b58-ea86d1b3356c",
  type: "page-type/world-class",
  slug: "duelist-princess",
  title: "Duelist Princess",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesToSlugs: ["world-class/queen-temporary"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.957Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
