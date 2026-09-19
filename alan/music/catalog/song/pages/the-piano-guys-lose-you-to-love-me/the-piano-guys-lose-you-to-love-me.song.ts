import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysLoseYouToLoveMe = {
  id: "01a0b780-0247-7c8a-bf70-6644d856c6a9",
  type: "page-type/song",
  slug: "the-piano-guys-lose-you-to-love-me",
  title: "Lose You To Love Me",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
