import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallRememberMe = {
  id: "01a0b77e-92b5-76d7-81dd-56cfe537bcd9",
  type: "page-type/song",
  slug: "paul-cardall-remember-me",
  title: "Remember Me",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
