import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAngelsong = {
  id: "01a0ba64-e187-76a5-8f26-b63a722e703e",
  type: "page-type/song",
  slug: "coldplay-angelsong",
  title: "Angelsong",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
