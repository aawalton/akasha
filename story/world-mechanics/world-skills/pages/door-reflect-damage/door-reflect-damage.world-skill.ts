import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const doorReflectDamage = {
  id: "01a06575-9805-7fbe-8b53-3e111e968ef3",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "door-reflect-damage",
  title: "Door: Reflect Damage",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
