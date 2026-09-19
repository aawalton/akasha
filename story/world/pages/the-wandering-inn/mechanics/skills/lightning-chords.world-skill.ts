import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lightningChords = {
  id: "01a0657d-023f-7c12-ab2a-49a8661d9a7e",
  type: "page-type/world-skill",
  slug: "lightning-chords",
  title: "Lightning Chords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
