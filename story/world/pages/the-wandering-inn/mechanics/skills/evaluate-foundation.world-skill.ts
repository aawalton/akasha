import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evaluateFoundation = {
  id: "01a06575-9809-7684-bcc9-e4ae5d49e3fc",
  type: "page-type/world-skill",
  slug: "evaluate-foundation",
  title: "Evaluate Foundation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
