import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraSoundBath = {
  id: "01a0b770-ccfb-7747-afaa-e60e44c3a8d4",
  type: "page-type/song",
  slug: "aurora-sound-bath",
  title: "Sound Bath",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
