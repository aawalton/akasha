import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const heiress = {
  id: "01a0657e-1372-7c7f-9d68-58f1a157216c",
  type: "page-type/world-class",
  slug: "heiress",
  title: "Heiress",
  world: "world/the-wandering-inn",
  appearanceCount: 40,
  evolvesToSlugs: ["world-class/relickeeper-heiress"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.466Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
