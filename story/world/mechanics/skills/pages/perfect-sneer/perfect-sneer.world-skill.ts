import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectSneer = {
  id: "01a0657d-028f-78a3-b337-73fab14d7f70",
  type: "page-type/world-skill",
  slug: "perfect-sneer",
  title: "Perfect Sneer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
