import type { CharacterTrait } from "akasha/story/world/mechanics/traits/character-trait/character-trait.page-type.types.ts"

export const memoCheckPlayerQuickStudy = {
  id: "01a1832d-38c0-7c51-b179-474308f937e6",
  type: "page-type/character-trait",
  slug: "memo-check-player-quick-study",
  title: "Quick Study",
  world: "world/memo-check-world",
  story: "story-played/memo-check",
  character: "character-player/memo-check-player",
  description: "New skills gain experience a little faster.",
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies CharacterTrait
