import type { CharacterTrait } from "akasha/story/world/mechanics/traits/character-trait/character-trait.page-type.types.ts"

export const undoCheckPlayerQuickStudy = {
  id: "01a18309-e114-7f6d-af46-aea8fcbcb15d",
  type: "page-type/character-trait",
  slug: "undo-check-player-quick-study",
  title: "Quick Study",
  world: "world/undo-check-world",
  story: "story-played/undo-check",
  character: "character-player/undo-check-player",
  description: "New skills gain experience a little faster.",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies CharacterTrait
