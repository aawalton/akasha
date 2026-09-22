import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekTheHandSong = {
  id: "01a0caa8-bc2a-7587-8a56-ac8e8451c949",
  type: "page-type/song",
  slug: "nickel-creek-the-hand-song",
  title: "The Hand Song",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
