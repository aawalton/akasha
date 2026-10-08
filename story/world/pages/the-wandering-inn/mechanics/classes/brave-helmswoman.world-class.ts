import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const braveHelmswoman = {
  id: "01a0657e-1340-7181-9f8e-a8a10731aa53",
  type: "page-type/world-class",
  slug: "brave-helmswoman",
  title: "Brave Helmswoman",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/ghosttouched-runaway"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.416Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
