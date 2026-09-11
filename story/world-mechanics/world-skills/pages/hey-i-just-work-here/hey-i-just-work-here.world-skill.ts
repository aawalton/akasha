import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const heyIJustWorkHere = {
  id: "01a06575-981a-7d2f-9b73-3bce849939b9",
  type: "world-skill",
  slug: "hey-i-just-work-here",
  title: "Hey, I Just Work Here",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
