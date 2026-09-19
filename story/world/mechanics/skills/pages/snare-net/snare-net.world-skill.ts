import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const snareNet = {
  id: "01a0657d-02c7-77da-9b11-9f3b504234d7",
  type: "page-type/world-skill",
  slug: "snare-net",
  title: "Snare Net",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
