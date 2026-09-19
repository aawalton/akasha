import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysEveryBreathYouTake = {
  id: "01a0b780-6776-7f1c-bfb0-adb876f1aab3",
  type: "page-type/song",
  slug: "the-piano-guys-every-breath-you-take",
  title: "Every Breath You Take",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
