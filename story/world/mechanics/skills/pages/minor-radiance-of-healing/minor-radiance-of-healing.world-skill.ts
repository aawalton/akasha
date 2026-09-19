import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const minorRadianceOfHealing = {
  id: "01a0657d-024d-74cd-9a19-c5b32007b38a",
  type: "page-type/world-skill",
  slug: "minor-radiance-of-healing",
  title: "Minor Radiance of Healing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
