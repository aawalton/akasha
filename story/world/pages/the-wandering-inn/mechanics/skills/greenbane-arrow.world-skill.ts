import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greenbaneArrow = {
  id: "01a06575-9817-7c84-924a-c12e470b91e3",
  type: "page-type/world-skill",
  slug: "greenbane-arrow",
  title: "Greenbane Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
