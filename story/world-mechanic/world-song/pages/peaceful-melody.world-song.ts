import type { WorldSong } from "akasha/story/world-mechanic/world-song/world-song.page-type.types.ts"

export const peacefulMelody = {
  id: "01a0655a-0688-7f77-b8a8-4145aef07660",
  type: "world-song",
  slug: "peaceful-melody",
  title: "Peaceful Melody",
  world: "world/the-wandering-inn",
} as const satisfies WorldSong
