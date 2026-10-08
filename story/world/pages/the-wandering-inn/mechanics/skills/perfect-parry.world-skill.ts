import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectParry = {
  id: "01a0657d-028f-7c51-9bad-2688d33a574e",
  type: "page-type/world-skill",
  slug: "perfect-parry",
  title: "Perfect Parry",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.607Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
