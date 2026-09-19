import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perpendicularShot = {
  id: "01a0657d-028f-7375-a5af-61ef7ca7feca",
  type: "page-type/world-skill",
  slug: "perpendicular-shot",
  title: "Perpendicular Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
