import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedTrialNalaPathOfWillpower = {
  id: "01a18d10-93f1-72c3-a51e-4a170c7d09c1",
  type: "page-type/character-skill",
  slug: "gifted-trial-nala-path-of-willpower",
  world: "world/gifted-trial-world",
  character: "character-player/gifted-trial-nala",
  skill: "world-skill/gifted-trial-world-path-of-willpower",
  experience: 0,
  unrevealed: true,
  attribute: "metric-character-stat/gifted-trial-nala-mental",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies CharacterSkill
