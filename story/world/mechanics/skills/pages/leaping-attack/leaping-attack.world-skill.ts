import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const leapingAttack = {
  id: "01a06575-9822-7b5b-8589-ab290f7a483a",
  type: "page-type/world-skill",
  slug: "leaping-attack",
  title: "Leaping Attack",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
