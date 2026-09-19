import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const synchronizedShamanism = {
  id: "01a0657d-0307-71a1-bb14-d1015b3fccb1",
  type: "page-type/world-skill",
  slug: "synchronized-shamanism",
  title: "Synchronized Shamanism",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
