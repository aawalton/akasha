import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wondrousDeed = {
  id: "01a0657d-0337-72d5-b9f5-35cb5f18dbfd",
  type: "page-type/world-skill",
  slug: "wondrous-deed",
  title: "Wondrous Deed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
