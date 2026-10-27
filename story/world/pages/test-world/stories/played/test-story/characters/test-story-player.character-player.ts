import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const testStoryPlayer = {
  id: "01a17ec6-0539-7d18-ad0a-73a0e374878e",
  type: "page-type/character-player",
  slug: "test-story-player",
  title: "Test Player",
  cover: "image/image-17f59c7233925455",
  story: "story-played/test-story",
  place: "place/test-world-square",
  person: "person/alan",
  createdAt: "2026-10-27T19:11:09.113Z",
  updatedAt: "2026-10-27T19:11:09.113Z",
} as const satisfies CharacterPlayer
