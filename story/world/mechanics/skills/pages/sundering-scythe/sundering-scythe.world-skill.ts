import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sunderingScythe = {
  id: "01a0657d-0302-74de-8f7f-6db7a970b1d0",
  type: "page-type/world-skill",
  slug: "sundering-scythe",
  title: "Sundering Scythe",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
