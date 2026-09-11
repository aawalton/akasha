import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const imperialLevy = {
  id: "01a06575-981d-7405-bf9b-c7ae9258c433",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "imperial-levy",
  title: "Imperial Levy",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
