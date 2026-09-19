import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysForTheBeautyOfTheEarth = {
  id: "01a0b783-7c00-788b-bfcb-082a0944475b",
  type: "page-type/song",
  slug: "the-piano-guys-for-the-beauty-of-the-earth",
  title: "For The Beauty of The Earth",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
