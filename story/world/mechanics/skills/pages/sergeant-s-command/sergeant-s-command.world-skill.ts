import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sergeantSCommand = {
  id: "01a0657d-02bf-7aab-86a9-623dc0d8c3c3",
  type: "page-type/world-skill",
  slug: "sergeant-s-command",
  title: "Sergeant’s Command",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
