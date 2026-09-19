import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sunderingSlash = {
  id: "01a0657d-0302-7716-b7e9-8015a35dfe1c",
  type: "page-type/world-skill",
  slug: "sundering-slash",
  title: "Sundering Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
