import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const relaxedMuscles = {
  id: "01a0657d-02b0-7a44-af3b-9696ae4ce77f",
  type: "page-type/world-skill",
  slug: "relaxed-muscles",
  title: "Relaxed Muscles",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
