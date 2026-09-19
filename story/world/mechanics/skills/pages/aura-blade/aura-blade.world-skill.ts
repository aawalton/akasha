import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraBlade = {
  id: "01a06575-97ee-76da-a446-ed46fb90f02f",
  type: "page-type/world-skill",
  slug: "aura-blade",
  title: "Aura Blade",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
