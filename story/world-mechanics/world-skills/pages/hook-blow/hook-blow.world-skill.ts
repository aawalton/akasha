import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hookBlow = {
  id: "01a06575-981a-726f-ab7b-a38afafaf183",
  type: "world-skill",
  slug: "hook-blow",
  title: "Hook Blow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
