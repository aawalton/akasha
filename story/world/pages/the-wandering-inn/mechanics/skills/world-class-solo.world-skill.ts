import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const worldClassSolo = {
  id: "01a0657d-0337-72f6-b403-bb7e5e20098a",
  type: "page-type/world-skill",
  slug: "world-class-solo",
  title: "World-Class Solo",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
