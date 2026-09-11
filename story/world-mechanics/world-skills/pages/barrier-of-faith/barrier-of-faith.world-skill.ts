import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const barrierOfFaith = {
  id: "01a06575-97f3-75af-a8f0-820d61ecfac0",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "barrier-of-faith",
  title: "Barrier of Faith",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
