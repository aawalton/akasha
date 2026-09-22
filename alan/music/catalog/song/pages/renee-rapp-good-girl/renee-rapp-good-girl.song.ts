import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappGoodGirl = {
  id: "01a0caa8-fe9d-77df-bfce-50492242d469",
  type: "page-type/song",
  slug: "renee-rapp-good-girl",
  title: "Good Girl",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
