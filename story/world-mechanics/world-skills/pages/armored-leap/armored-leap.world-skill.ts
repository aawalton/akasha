import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const armoredLeap = {
  id: "01a06575-97ec-7659-96ba-481ab448347f",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "armored-leap",
  title: "Armored Leap",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
