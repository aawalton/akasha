import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicCartography = {
  id: "01a06575-97f3-7a0a-bca0-bd3ab96186ec",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "basic-cartography",
  title: "Basic Cartography",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
