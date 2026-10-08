import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicalInnkeeper = {
  id: "01a0657e-022b-7d28-8e32-fa635a33232b",
  type: "page-type/world-class",
  slug: "magical-innkeeper",
  title: "Magical Innkeeper",
  world: "world/the-wandering-inn",
  appearanceCount: 56,
  evolvesFromSlugs: ["world-class/innkeeper"],
  evolvesToSlugs: ["world-class/the-wandering-innkeeper"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.043Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
