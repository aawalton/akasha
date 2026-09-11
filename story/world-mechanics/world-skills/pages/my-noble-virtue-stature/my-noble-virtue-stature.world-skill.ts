import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const myNobleVirtueStature = {
  id: "01a0657d-0270-70b8-b16a-e964ac1cf7c8",
  type: "world-skill",
  slug: "my-noble-virtue-stature",
  title: "My Noble Virtue: Stature",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
