import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const seeItMyWay = {
  id: "01a0657d-02b8-7307-aabe-6726803c8a41",
  type: "page-type/world-skill",
  slug: "see-it-my-way",
  title: "See it My Way",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  aliases: ["See It My Way"],
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.648Z",
  updatedAt: "2026-09-22T13:33:17.000Z",
} as const satisfies WorldSkill
