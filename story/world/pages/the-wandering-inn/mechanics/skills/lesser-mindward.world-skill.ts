import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserMindward = {
  id: "01a06575-9823-7f4c-803d-e3ec34e8409e",
  type: "page-type/world-skill",
  slug: "lesser-mindward",
  title: "Lesser Mindward",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
