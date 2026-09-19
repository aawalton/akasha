import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const highlightForageables = {
  id: "01a06575-981a-795b-8c42-ef63ae4f3083",
  type: "page-type/world-skill",
  slug: "highlight-forageables",
  title: "Highlight Forageables",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
