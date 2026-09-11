import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const alliedDistressCall = {
  id: "01a06575-97eb-7fca-bd67-1e44a5470a07",
  type: "world-skill",
  slug: "allied-distress-call",
  title: "Allied Distress Call",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
