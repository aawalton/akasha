import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const flagBearer = {
  id: "01a0657e-1365-7657-9820-893c3dd52d15",
  type: "page-type/world-class",
  slug: "flag-bearer",
  title: "Flag Bearer",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  aliases: ["flag-bearers"],
  evolvesToSlugs: ["world-class/banner-leader"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.453Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
