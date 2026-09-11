import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const leapOfDeath = {
  id: "01a06575-9822-76d0-b7de-1ab3e4ee9ea6",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "leap-of-death",
  title: "Leap of Death",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
