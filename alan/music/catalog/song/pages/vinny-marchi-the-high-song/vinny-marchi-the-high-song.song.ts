import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiTheHighSong = {
  id: "01a0b783-dd5f-7017-9438-9e84815787d6",
  type: "page-type/song",
  slug: "vinny-marchi-the-high-song",
  title: "The High Song",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
