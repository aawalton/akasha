import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const worldOfYouAndMe = {
  id: "01a0657d-0337-7776-9f24-f3eb2638021f",
  type: "page-type/world-skill",
  slug: "world-of-you-and-me",
  title: "World of You and Me",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  aliases: ["World of You And Me"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.775Z",
  updatedAt: "2026-09-22T13:33:49.000Z",
} as const satisfies WorldSkill
