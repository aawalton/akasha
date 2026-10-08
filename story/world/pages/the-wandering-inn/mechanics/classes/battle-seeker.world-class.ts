import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battleSeeker = {
  id: "01a0657e-133d-777c-a86b-351b407c812d",
  type: "page-type/world-class",
  slug: "battle-seeker",
  title: "Battle Seeker",
  world: "world/the-wandering-inn",
  appearanceCount: 9,
  aliases: ["battle-seekers"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.413Z",
  updatedAt: "2026-09-22T13:28:33.000Z",
} as const satisfies WorldClass
