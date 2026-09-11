import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const doubledVolley = {
  id: "01a06575-9805-768f-a0b6-00596f471ed1",
  type: "world-skill",
  slug: "doubled-volley",
  title: "Doubled Volley",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
