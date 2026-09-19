import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const seekingShots = {
  id: "01a0657d-02b8-7c2c-af27-943c5c6a58d5",
  type: "page-type/world-skill",
  slug: "seeking-shots",
  title: "Seeking Shots",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
