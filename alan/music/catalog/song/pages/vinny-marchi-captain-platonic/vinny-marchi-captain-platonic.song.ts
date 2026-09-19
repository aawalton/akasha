import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiCaptainPlatonic = {
  id: "01a0b783-972c-7b3b-93b5-ef85a622f67b",
  type: "page-type/song",
  slug: "vinny-marchi-captain-platonic",
  title: "Captain Platonic",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
