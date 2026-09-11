import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const instantaneousBombardment = {
  id: "01a06575-981f-7233-8543-909c09a89705",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "instantaneous-bombardment",
  title: "Instantaneous Bombardment",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
