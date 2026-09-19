import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMoonMusicElodie = {
  id: "01a0ba64-e7a4-7db2-850b-45b4bb35026e",
  type: "page-type/song",
  slug: "coldplay-moon-music-elodie",
  title: "Moon Music - Elodie",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
