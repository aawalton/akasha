import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lightningJab = {
  id: "01a0657d-023f-7e85-a19e-c09e1bab32ae",
  type: "page-type/world-skill",
  slug: "lightning-jab",
  title: "Lightning Jab",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
