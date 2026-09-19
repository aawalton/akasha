import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const muffledMovement = {
  id: "01a0657d-0270-73d9-9554-003dc14ee371",
  type: "page-type/world-skill",
  slug: "muffled-movement",
  title: "Muffled Movement",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
