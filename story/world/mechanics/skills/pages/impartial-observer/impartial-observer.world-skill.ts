import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const impartialObserver = {
  id: "01a06575-981d-7cd7-9c62-9bf5662e1fae",
  type: "page-type/world-skill",
  slug: "impartial-observer",
  title: "Impartial Observer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
