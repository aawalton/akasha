import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const magewardShield = {
  id: "01a0657d-0241-7327-9fd9-93ca4179a1e4",
  type: "page-type/world-skill",
  slug: "mageward-shield",
  title: "Mageward Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
