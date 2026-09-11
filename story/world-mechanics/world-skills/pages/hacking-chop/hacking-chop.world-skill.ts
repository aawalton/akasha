import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hackingChop = {
  id: "01a06575-9818-70c1-b49f-4464fe425a05",
  type: "world-skill",
  slug: "hacking-chop",
  title: "Hacking Chop",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
