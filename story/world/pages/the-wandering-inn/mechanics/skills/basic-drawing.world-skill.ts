import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicDrawing = {
  id: "01a06575-97f3-7a7c-9bf0-c7bd57b4cf24",
  type: "page-type/world-skill",
  slug: "basic-drawing",
  title: "Basic Drawing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
