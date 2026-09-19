import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lightningIai = {
  id: "01a0657d-023f-740d-aafd-53e5a3bcb7a3",
  type: "page-type/world-skill",
  slug: "lightning-iai",
  title: "Lightning Iai",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
