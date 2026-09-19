import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pointBlankShot = {
  id: "01a0657d-0295-7bd6-ab55-ca609b3a8cdd",
  type: "page-type/world-skill",
  slug: "point-blank-shot",
  title: "Point-Blank Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
