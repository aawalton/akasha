import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const honorSShieldSingleUse = {
  id: "01a06575-981a-73ba-8e2f-e1c34e532f7b",
  type: "world-skill",
  slug: "honor-s-shield-single-use",
  title: "Honor’s Shield – Single Use",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
