import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const senseHeat = {
  id: "01a0657d-02b9-714f-8691-e22124db9f12",
  type: "page-type/world-skill",
  slug: "sense-heat",
  title: "Sense Heat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
