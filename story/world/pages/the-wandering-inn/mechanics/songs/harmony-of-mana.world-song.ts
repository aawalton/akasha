import type { WorldSong } from "akasha/story/world/mechanics/songs/world-song.page-type.types.ts"

export const harmonyOfMana = {
  id: "01a0655a-0688-7508-b6b9-899eb8a2597a",
  type: "page-type/world-song",
  slug: "harmony-of-mana",
  title: "Harmony of Mana",
  world: "world/the-wandering-inn",
} as const satisfies WorldSong
