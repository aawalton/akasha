import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickSlumber = {
  id: "01a0657d-029b-7b74-b959-49ef94fb27ec",
  type: "page-type/world-skill",
  slug: "quick-slumber",
  title: "Quick Slumber",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
