import type { CharacterTrait } from "akasha/story/world/mechanics/traits/character-trait/character-trait.page-type.types.ts"

export const skillLockProbePlayerQuickStudy = {
  id: "01a17ff8-9a7f-78e1-aec5-0485f3c3585e",
  type: "page-type/character-trait",
  slug: "skill-lock-probe-player-quick-study",
  title: "Quick Study",
  world: "world/skill-lock-probe-world",
  story: "story-played/skill-lock-probe",
  character: "character-player/skill-lock-probe-player",
  description: "New skills gain experience a little faster.",
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies CharacterTrait
