import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const waterwalked = {
  id: "01a0657d-032c-7222-b494-47caeab8212d",
  type: "world-skill",
  slug: "waterwalked",
  title: "Waterwalked",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
