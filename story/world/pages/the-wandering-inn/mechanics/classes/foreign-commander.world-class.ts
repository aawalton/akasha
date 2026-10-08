import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const foreignCommander = {
  id: "01a0657e-1366-7eb7-98f2-d71a3c6f531f",
  type: "page-type/world-class",
  slug: "foreign-commander",
  title: "Foreign Commander",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-class/combined-arms-commander"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.454Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
