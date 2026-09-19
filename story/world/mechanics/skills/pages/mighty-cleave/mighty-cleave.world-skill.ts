import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mightyCleave = {
  id: "01a0657d-024d-78de-b3d3-6bb77631ae76",
  type: "page-type/world-skill",
  slug: "mighty-cleave",
  title: "Mighty Cleave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
