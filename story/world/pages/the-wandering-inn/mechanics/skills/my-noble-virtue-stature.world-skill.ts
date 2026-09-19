import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const myNobleVirtueStature = {
  id: "01a0657d-0270-70b8-b16a-e964ac1cf7c8",
  type: "page-type/world-skill",
  slug: "my-noble-virtue-stature",
  title: "My Noble Virtue: Stature",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
