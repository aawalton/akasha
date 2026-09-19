import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const incendiaryFist = {
  id: "01a06575-981e-7b6c-8c5f-d858c6cf58b2",
  type: "page-type/world-skill",
  slug: "incendiary-fist",
  title: "Incendiary Fist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
