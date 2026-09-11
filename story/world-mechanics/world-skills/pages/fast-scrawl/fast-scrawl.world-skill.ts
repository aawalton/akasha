import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fastScrawl = {
  id: "01a06575-980b-7fc5-9883-ca4c7d946511",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "fast-scrawl",
  title: "Fast Scrawl",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
