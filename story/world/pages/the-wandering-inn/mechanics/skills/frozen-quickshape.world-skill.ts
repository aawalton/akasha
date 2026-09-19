import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const frozenQuickshape = {
  id: "01a06575-9811-7c10-9be6-f49c73fff9ff",
  type: "page-type/world-skill",
  slug: "frozen-quickshape",
  title: "Frozen Quickshape",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
