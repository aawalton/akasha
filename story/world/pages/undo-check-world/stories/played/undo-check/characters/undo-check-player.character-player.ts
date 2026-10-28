import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const undoCheckPlayer = {
  id: "01a18309-e114-7998-99f7-641db4e349ec",
  type: "page-type/character-player",
  slug: "undo-check-player",
  title: "Test Player",
  cover: "image/image-17f59c7233925455",
  story: "story-played/undo-check",
  place: "place/undo-check-world-square",
  person: "person/alan",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies CharacterPlayer
