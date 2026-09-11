import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const intimidatingShout = {
  id: "01a06575-9820-7cdc-a2cb-9d4a7b338d34",
  type: "world-skill",
  slug: "intimidating-shout",
  title: "Intimidating Shout",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
