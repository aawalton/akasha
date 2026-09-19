import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doorOversizedTransportation = {
  id: "01a06575-9805-7f55-84a8-2d8700dce8ea",
  type: "page-type/world-skill",
  slug: "door-oversized-transportation",
  title: "Door: Oversized Transportation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
