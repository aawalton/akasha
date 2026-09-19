import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const highlightTarget = {
  id: "01a06575-981a-7b64-ac92-bde5342d8366",
  type: "page-type/world-skill",
  slug: "highlight-target",
  title: "Highlight Target",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
