import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const seeItMyWay = {
  id: "01a0657d-02b8-7307-aabe-6726803c8a41",
  type: "page-type/world-skill",
  slug: "see-it-my-way",
  title: "See it My Way",
  world: "world/the-wandering-inn",
  aliases: ["See It My Way"],
  references: "jsonl",
} as const satisfies WorldSkill
