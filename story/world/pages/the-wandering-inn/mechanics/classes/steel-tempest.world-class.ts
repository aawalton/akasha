import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const steelTempest = {
  id: "01a06586-0a53-7e54-9ff5-eccf5500bbd6",
  type: "page-type/world-class",
  slug: "steel-tempest",
  title: "Steel Tempest",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesToSlugs: ["world-class/steelforged-whirlwind"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.419Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
