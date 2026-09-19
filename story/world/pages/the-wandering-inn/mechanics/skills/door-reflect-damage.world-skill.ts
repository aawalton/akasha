import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doorReflectDamage = {
  id: "01a06575-9805-7fbe-8b53-3e111e968ef3",
  type: "page-type/world-skill",
  slug: "door-reflect-damage",
  title: "Door: Reflect Damage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
