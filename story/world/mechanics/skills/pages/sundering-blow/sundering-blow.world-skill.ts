import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sunderingBlow = {
  id: "01a0657d-0302-7674-a5f3-e10344bf5681",
  type: "page-type/world-skill",
  slug: "sundering-blow",
  title: "Sundering Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
