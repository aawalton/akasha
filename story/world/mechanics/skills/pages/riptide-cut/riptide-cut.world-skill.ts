import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const riptideCut = {
  id: "01a0657d-02b2-7d4b-812c-eb5b094a6850",
  type: "page-type/world-skill",
  slug: "riptide-cut",
  title: "Riptide Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
