import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const automaticReload = {
  id: "01a06575-97f1-78f5-8a9a-af56e87194c3",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "automatic-reload",
  title: "Automatic Reload",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
