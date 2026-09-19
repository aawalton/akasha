import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const supplyDrop = {
  id: "01a0657d-0302-7534-b76f-df2a367c411e",
  type: "page-type/world-skill",
  slug: "supply-drop",
  title: "Supply Drop",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
