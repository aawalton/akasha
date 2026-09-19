import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const powerShot = {
  id: "01a0657d-0295-72b2-a006-a6faf6b68ad7",
  type: "page-type/world-skill",
  slug: "power-shot",
  title: "Power Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
