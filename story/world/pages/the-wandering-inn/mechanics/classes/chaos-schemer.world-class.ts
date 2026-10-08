import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const chaosSchemer = {
  id: "01a0657e-01c4-7374-93a6-2e1d3a850671",
  type: "page-type/world-class",
  slug: "chaos-schemer",
  title: "Chaos Schemer",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  evolvesFromSlugs: ["world-class/plotter"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.940Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
