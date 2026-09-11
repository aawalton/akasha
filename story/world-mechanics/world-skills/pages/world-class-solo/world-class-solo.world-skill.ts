import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const worldClassSolo = {
  id: "01a0657d-0337-72f6-b403-bb7e5e20098a",
  type: "world-skill",
  slug: "world-class-solo",
  title: "World-Class Solo",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
