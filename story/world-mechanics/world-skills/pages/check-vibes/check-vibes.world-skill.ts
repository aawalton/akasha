import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const checkVibes = {
  id: "01a06575-97fb-794a-b12b-23b017300a1c",
  type: "world-skill",
  slug: "check-vibes",
  title: "Check Vibes",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
