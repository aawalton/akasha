import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const supernaturalSense = {
  id: "01a0657d-0302-7fbd-b4f7-46a3d3e2f5d3",
  type: "page-type/world-skill",
  slug: "supernatural-sense",
  title: "Supernatural Sense",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
