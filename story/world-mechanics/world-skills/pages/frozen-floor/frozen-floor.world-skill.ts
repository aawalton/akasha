import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const frozenFloor = {
  id: "01a06575-9811-7d95-a5e6-f187ac925489",
  type: "world-skill",
  slug: "frozen-floor",
  title: "Frozen Floor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
