import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const minorQuake = {
  id: "01a0657d-024d-7e98-a225-76c84e0d0fcd",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "minor-quake",
  title: "Minor Quake",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
