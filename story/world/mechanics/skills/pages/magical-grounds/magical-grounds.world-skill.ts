import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const magicalGrounds = {
  id: "01a0657d-0242-75c3-85cf-99811c5b621e",
  type: "page-type/world-skill",
  slug: "magical-grounds",
  title: "Magical Grounds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
