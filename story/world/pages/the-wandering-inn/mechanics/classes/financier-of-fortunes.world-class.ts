import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const financierOfFortunes = {
  id: "01a0657e-1364-789c-bbb8-9539f0fb0b6f",
  type: "page-type/world-class",
  slug: "financier-of-fortunes",
  title: "Financier of Fortunes",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-class/mint-lord-of-the-new-era"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.452Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
