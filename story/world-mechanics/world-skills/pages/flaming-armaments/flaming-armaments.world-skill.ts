import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const flamingArmaments = {
  id: "01a06575-980d-7aa5-8ae2-9807046b38b6",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "flaming-armaments",
  title: "Flaming Armaments",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
