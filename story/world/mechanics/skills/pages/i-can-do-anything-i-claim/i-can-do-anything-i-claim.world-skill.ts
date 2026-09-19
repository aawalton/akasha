import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iCanDoAnythingIClaim = {
  id: "01a06575-981b-7e45-8cf3-ba01a05873db",
  type: "page-type/world-skill",
  slug: "i-can-do-anything-i-claim",
  title: "I Can Do Anything I Claim",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
