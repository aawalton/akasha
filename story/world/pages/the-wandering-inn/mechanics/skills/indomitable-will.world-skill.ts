import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const indomitableWill = {
  id: "01a06575-981e-7aaf-8448-806f6535eac0",
  type: "page-type/world-skill",
  slug: "indomitable-will",
  title: "Indomitable Will",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
