import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const witnessOfDivinity = {
  id: "01a06586-0a83-7f68-a8a8-dd4458b91928",
  type: "page-type/world-class",
  slug: "witness-of-divinity",
  title: "Witness of Divinity",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["prophet-of-the-holy-people"],
  references: "jsonl",
} as const satisfies WorldClass
