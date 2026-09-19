import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const foresightMortalWound = {
  id: "01a06575-9810-7202-a8cf-3d3cc3d99b58",
  type: "page-type/world-skill",
  slug: "foresight-mortal-wound",
  title: "Foresight: Mortal Wound",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
