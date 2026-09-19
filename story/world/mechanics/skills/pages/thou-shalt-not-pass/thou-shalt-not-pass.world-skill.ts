import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thouShaltNotPass = {
  id: "01a0657d-0315-7a8a-9fb9-fd7875208fb9",
  type: "page-type/world-skill",
  slug: "thou-shalt-not-pass",
  title: "Thou Shalt Not Pass",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
