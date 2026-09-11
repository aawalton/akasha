import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const cuteSmile = {
  id: "01a06575-9800-7d46-b78a-e1931c3d0202",
  type: "world-skill",
  slug: "cute-smile",
  title: "Cute Smile",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
