import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const lesserMagicResistance = {
  id: "01a06575-9823-7d3d-ab74-f6e910c9b1ed",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "lesser-magic-resistance",
  title: "Lesser Magic Resistance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
