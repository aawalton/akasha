import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const steelFists = {
  id: "01a0657d-02fa-7b3e-824f-515afd2881a9",
  type: "page-type/world-skill",
  slug: "steel-fists",
  title: "Steel Fists",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
