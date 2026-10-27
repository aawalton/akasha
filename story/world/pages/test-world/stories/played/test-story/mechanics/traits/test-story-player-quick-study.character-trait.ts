import type { CharacterTrait } from "akasha/story/world/mechanics/traits/character-trait/character-trait.page-type.types.ts"

export const testStoryPlayerQuickStudy = {
  id: "01a17ec7-ed60-71e5-b4d9-bc040c90b852",
  type: "page-type/character-trait",
  slug: "test-story-player-quick-study",
  title: "Quick Study",
  world: "world/test-world",
  story: "story-played/test-story",
  character: "character-player/test-story-player",
  description: "New skills gain experience a little faster.",
  createdAt: "2026-10-27T19:13:14.079Z",
  updatedAt: "2026-10-27T19:13:14.079Z",
} as const satisfies CharacterTrait
