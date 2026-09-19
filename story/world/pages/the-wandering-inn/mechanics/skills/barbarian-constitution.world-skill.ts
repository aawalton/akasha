import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const barbarianConstitution = {
  id: "01a06575-97f3-7094-92cc-eef0fdb12f4c",
  type: "page-type/world-skill",
  slug: "barbarian-constitution",
  title: "Barbarian Constitution",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
