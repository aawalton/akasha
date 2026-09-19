import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const automaticReload = {
  id: "01a06575-97f1-78f5-8a9a-af56e87194c3",
  type: "page-type/world-skill",
  slug: "automatic-reload",
  title: "Automatic Reload",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
