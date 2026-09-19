import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const volleyPiercingArrows = {
  id: "01a0657d-032b-7ab9-9804-f7a20368fa95",
  type: "page-type/world-skill",
  slug: "volley-piercing-arrows",
  title: "Volley: Piercing Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
