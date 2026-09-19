import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wickedCuts = {
  id: "01a0657d-032e-7441-bb6e-3070a413964d",
  type: "page-type/world-skill",
  slug: "wicked-cuts",
  title: "Wicked Cuts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
