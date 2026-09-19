import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickslash = {
  id: "01a0657d-029c-7264-9f9c-0431faff6782",
  type: "page-type/world-skill",
  slug: "quickslash",
  title: "Quickslash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
