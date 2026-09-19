import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const resistanceToFire = {
  id: "01a0657d-02b1-740b-818a-e6dbe01a2087",
  type: "page-type/world-skill",
  slug: "resistance-to-fire",
  title: "Resistance to Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
