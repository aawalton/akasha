import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectGuard = {
  id: "01a0657d-028f-7f97-8643-164f1cf0f220",
  type: "page-type/world-skill",
  slug: "perfect-guard",
  title: "Perfect Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
