import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastScrawl = {
  id: "01a06575-980b-7fc5-9883-ca4c7d946511",
  type: "page-type/world-skill",
  slug: "fast-scrawl",
  title: "Fast Scrawl",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
