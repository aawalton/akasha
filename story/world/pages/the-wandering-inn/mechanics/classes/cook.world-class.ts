import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const cook = {
  id: "01a0657e-134e-7db6-8458-fa279a4b9521",
  type: "page-type/world-class",
  slug: "cook",
  title: "Cook",
  world: "world/the-wandering-inn",
  appearanceCount: 139,
  aliases: ["cooks"],
  evolvesToSlugs: ["world-class/forager-cook"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.430Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
