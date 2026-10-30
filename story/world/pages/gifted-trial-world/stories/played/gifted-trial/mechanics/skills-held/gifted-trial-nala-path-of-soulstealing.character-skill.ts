import type { CharacterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.types.ts"

export const giftedTrialNalaPathOfSoulstealing = {
  id: "01a18d10-93f1-7634-8c81-a97a8568d5b8",
  type: "page-type/character-skill",
  slug: "gifted-trial-nala-path-of-soulstealing",
  world: "world/gifted-trial-world",
  character: "character-player/gifted-trial-nala",
  skill: "world-skill/gifted-trial-world-path-of-soulstealing",
  experience: 0,
  unrevealed: false,
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies CharacterSkill
