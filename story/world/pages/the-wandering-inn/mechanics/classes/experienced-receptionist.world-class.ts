import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const experiencedReceptionist = {
  id: "01a0657e-01d9-7494-94fa-b48aa0a096d9",
  type: "page-type/world-class",
  slug: "experienced-receptionist",
  title: "Experienced Receptionist",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-class/vice-guildmistress"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.961Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
