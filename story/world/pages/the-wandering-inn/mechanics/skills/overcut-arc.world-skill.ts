import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overcutArc = {
  id: "01a0657d-027f-7d36-a2dc-6b130869b283",
  type: "page-type/world-skill",
  slug: "overcut-arc",
  title: "Overcut Arc",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
