import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const manaWellEarthen = {
  id: "01a0657d-0242-705a-ab1a-6880612518ca",
  type: "page-type/world-skill",
  slug: "mana-well-earthen",
  title: "Mana Well (Earthen)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
