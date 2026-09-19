import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shockVeil = {
  id: "01a0657d-02c1-7e7b-be3b-c94a035a1958",
  type: "page-type/world-skill",
  slug: "shock-veil",
  title: "Shock Veil",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
