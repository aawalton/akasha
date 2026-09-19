import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giantSStab = {
  id: "01a06575-9815-74ae-857d-dab125bd349b",
  type: "page-type/world-skill",
  slug: "giant-s-stab",
  title: "Giant’s Stab",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
