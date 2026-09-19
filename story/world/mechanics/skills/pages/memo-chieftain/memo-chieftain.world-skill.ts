import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const memoChieftain = {
  id: "01a0657d-024c-75b9-91e9-c97b26a4e5b3",
  type: "page-type/world-skill",
  slug: "memo-chieftain",
  title: "Memo: Chieftain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
