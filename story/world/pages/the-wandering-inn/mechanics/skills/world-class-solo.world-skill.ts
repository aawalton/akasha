import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const worldClassSolo = {
  id: "01a0657d-0337-72f6-b403-bb7e5e20098a",
  type: "page-type/world-skill",
  slug: "world-class-solo",
  title: "World-Class Solo",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.775Z",
  updatedAt: "2026-09-22T13:33:49.000Z",
} as const satisfies WorldSkill
