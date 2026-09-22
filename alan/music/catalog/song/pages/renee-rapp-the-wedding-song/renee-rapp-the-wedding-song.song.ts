import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappTheWeddingSong = {
  id: "01a0caa9-08e4-75b8-8c2b-d2b5c2bc56aa",
  type: "page-type/song",
  slug: "renee-rapp-the-wedding-song",
  title: "The Wedding Song",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
