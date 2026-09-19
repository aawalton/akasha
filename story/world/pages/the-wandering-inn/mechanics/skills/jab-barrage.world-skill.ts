import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const jabBarrage = {
  id: "01a06575-9820-754f-9e92-6a70c26679e0",
  type: "page-type/world-skill",
  slug: "jab-barrage",
  title: "Jab Barrage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
