import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const nobleDiction = {
  id: "01a0657d-027b-7040-98db-1dac43e71c34",
  type: "page-type/world-skill",
  slug: "noble-diction",
  title: "Noble Diction",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
