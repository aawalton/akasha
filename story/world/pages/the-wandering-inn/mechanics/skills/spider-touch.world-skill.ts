import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spiderTouch = {
  id: "01a0657d-02ee-7aa5-beb0-5e1b92956e14",
  type: "page-type/world-skill",
  slug: "spider-touch",
  title: "Spider Touch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
