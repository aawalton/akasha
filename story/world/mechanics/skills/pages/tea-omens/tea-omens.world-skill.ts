import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const teaOmens = {
  id: "01a0657d-0310-7272-840b-a7e9708a5b66",
  type: "page-type/world-skill",
  slug: "tea-omens",
  title: "Tea Omens",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
