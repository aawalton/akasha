import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const deflectBlow = {
  id: "01a06575-9802-79b1-b92c-3f612267ef22",
  type: "world-skill",
  slug: "deflect-blow",
  title: "Deflect Blow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
