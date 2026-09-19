import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sleepNow = {
  id: "01a0657d-02c6-76ba-82fe-bfbaf381db24",
  type: "page-type/world-skill",
  slug: "sleep-now",
  title: "Sleep, Now",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
