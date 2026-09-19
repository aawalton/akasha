import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cleaveTheHills = {
  id: "01a06575-97fb-7b67-95d2-55fa9ebfeaf9",
  type: "page-type/world-skill",
  slug: "cleave-the-hills",
  title: "Cleave the Hills",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
