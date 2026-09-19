import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const divineCross = {
  id: "01a06575-9804-736e-8d8b-cfa8be453ecd",
  type: "page-type/world-skill",
  slug: "divine-cross",
  title: "Divine Cross",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
