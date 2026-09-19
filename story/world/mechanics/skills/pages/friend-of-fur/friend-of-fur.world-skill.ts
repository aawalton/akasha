import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const friendOfFur = {
  id: "01a06575-9811-755c-951a-c57feeba30b7",
  type: "page-type/world-skill",
  slug: "friend-of-fur",
  title: "Friend of Fur",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
