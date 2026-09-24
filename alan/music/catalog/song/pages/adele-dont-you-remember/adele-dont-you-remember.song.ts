import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleDontYouRemember = {
  id: "01a0d52b-c259-7ab6-b4de-6dec1f1a3dcf",
  type: "page-type/song",
  slug: "adele-dont-you-remember",
  title: "Don't You Remember",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
