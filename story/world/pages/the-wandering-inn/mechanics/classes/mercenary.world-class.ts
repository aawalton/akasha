import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mercenary = {
  id: "01a0657e-13a0-757c-a347-97f1f26d72f8",
  type: "page-type/world-class",
  slug: "mercenary",
  title: "Mercenary",
  world: "world/the-wandering-inn",
  appearanceCount: 69,
  evolvesToSlugs: ["world-class/company-commander"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.512Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
