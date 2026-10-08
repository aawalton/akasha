import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const witnessOfDivinity = {
  id: "01a06586-0a83-7f68-a8a8-dd4458b91928",
  type: "page-type/world-class",
  slug: "witness-of-divinity",
  title: "Witness of Divinity",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/prophet-of-the-holy-people"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.467Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
