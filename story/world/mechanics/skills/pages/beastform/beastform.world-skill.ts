import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const beastform = {
  id: "01a06575-97f4-7ad9-9fd9-b5fa62e2f30e",
  type: "page-type/world-skill",
  slug: "beastform",
  title: "Beastform",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
