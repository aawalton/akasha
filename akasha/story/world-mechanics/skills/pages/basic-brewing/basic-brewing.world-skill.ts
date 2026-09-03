import type { WorldSkill } from "../../world-skill.page-type.ts"

export const basicBrewing = {
  id: "01a06575-97f3-74d4-98a7-22d4f1404e35",
  pageTypeSlug: "world-skill",
  slug: "basic-brewing",
  title: "Basic Brewing",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
