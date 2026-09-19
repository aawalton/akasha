import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const charmBeast = {
  id: "01a06575-97fa-7f1e-b6e5-6fa63684a911",
  type: "page-type/world-skill",
  slug: "charm-beast",
  title: "Charm Beast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
