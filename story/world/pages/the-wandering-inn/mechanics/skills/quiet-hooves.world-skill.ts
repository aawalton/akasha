import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quietHooves = {
  id: "01a0657d-029c-7d7f-927e-abf410beb7f5",
  type: "page-type/world-skill",
  slug: "quiet-hooves",
  title: "Quiet Hooves",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
