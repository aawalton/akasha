import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const braveHelmswoman = {
  id: "01a0657e-1340-7181-9f8e-a8a10731aa53",
  type: "world-class",
  slug: "brave-helmswoman",
  title: "Brave Helmswoman",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["ghosttouched-runaway"],
  references: "jsonl",
} as const satisfies WorldClass
