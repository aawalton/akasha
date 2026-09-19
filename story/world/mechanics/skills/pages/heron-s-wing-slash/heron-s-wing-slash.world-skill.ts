import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heronSWingSlash = {
  id: "01a06575-9819-7772-bec4-de12368c6202",
  type: "page-type/world-skill",
  slug: "heron-s-wing-slash",
  title: "Heron’s Wing Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
