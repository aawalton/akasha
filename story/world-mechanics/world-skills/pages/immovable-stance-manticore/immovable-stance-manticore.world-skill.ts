import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const immovableStanceManticore = {
  id: "01a06575-981d-7a6b-8ca9-2720a0f9b7ba",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "immovable-stance-manticore",
  title: "Immovable Stance: Manticore",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
