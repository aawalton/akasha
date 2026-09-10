import type { WorldSong } from "../world-song.page-type.types.ts"

export const peacefulMelody = {
  id: "01a0655a-0688-7f77-b8a8-4145aef07660",
  pageTypeSlug: "world-song",
  type: "world-song",
  slug: "peaceful-melody",
  title: "Peaceful Melody",
  world: "the-wandering-inn",
} as const satisfies WorldSong
