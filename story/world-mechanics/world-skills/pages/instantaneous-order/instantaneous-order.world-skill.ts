import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const instantaneousOrder = {
  id: "01a06575-981f-7e05-a677-21b426c88e40",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "instantaneous-order",
  title: "Instantaneous Order",
  world: "the-wandering-inn",
  evolvesToSlugs: ["open-the-pantries-the-wandering-inn"],
  references: "jsonl",
} as const satisfies WorldSkill
