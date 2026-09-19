import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bullSRush = {
  id: "01a06575-97f9-7af3-9f6c-b64c9bed0635",
  type: "page-type/world-skill",
  slug: "bull-s-rush",
  title: "Bull’s Rush",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
