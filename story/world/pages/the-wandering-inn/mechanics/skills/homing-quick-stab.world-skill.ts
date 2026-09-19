import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const homingQuickStab = {
  id: "01a06575-981a-7eea-9865-32400deee8b3",
  type: "page-type/world-skill",
  slug: "homing-quick-stab",
  title: "Homing Quick Stab",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
