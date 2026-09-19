import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const likeFlameBlowtorch = {
  id: "01a0657d-023f-7bde-b151-8bd09104cc4c",
  type: "page-type/world-skill",
  slug: "like-flame-blowtorch",
  title: "Like Flame, Blowtorch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
