import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const scribeNumber = {
  id: "01a0657d-02b8-78cb-9070-d2d044dad848",
  type: "page-type/world-skill",
  slug: "scribe-number",
  title: "Scribe Number",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
