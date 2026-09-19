import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lightningSlash = {
  id: "01a0657d-023f-7775-8703-2ae5284e3fd0",
  type: "page-type/world-skill",
  slug: "lightning-slash",
  title: "Lightning Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
