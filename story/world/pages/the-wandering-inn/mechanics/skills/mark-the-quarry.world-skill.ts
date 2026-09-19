import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const markTheQuarry = {
  id: "01a0657d-024b-73fa-917b-ee42f51a7e9a",
  type: "page-type/world-skill",
  slug: "mark-the-quarry",
  title: "Mark the Quarry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
