import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flamingSlash = {
  id: "01a06575-980d-705c-b372-90915540ad14",
  type: "page-type/world-skill",
  slug: "flaming-slash",
  title: "Flaming Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
