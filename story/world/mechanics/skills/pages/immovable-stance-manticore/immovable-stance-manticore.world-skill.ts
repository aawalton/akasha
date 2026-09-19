import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const immovableStanceManticore = {
  id: "01a06575-981d-7a6b-8ca9-2720a0f9b7ba",
  type: "page-type/world-skill",
  slug: "immovable-stance-manticore",
  title: "Immovable Stance: Manticore",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
