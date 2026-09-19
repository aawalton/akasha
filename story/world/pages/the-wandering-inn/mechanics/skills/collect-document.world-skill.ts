import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const collectDocument = {
  id: "01a06575-97fb-7215-a040-fb6203273e94",
  type: "page-type/world-skill",
  slug: "collect-document",
  title: "Collect Document",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
