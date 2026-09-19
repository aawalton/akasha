import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const automaticParry = {
  id: "01a06575-97f0-7b66-b3e4-9f12a2a43b2e",
  type: "page-type/world-skill",
  slug: "automatic-parry",
  title: "Automatic Parry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
