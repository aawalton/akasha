import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const catSGrace = {
  id: "01a06575-97fa-7b02-aadc-19198bd9bcb9",
  type: "page-type/world-skill",
  slug: "cat-s-grace",
  title: "Cat’s Grace",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
