import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappMad = {
  id: "01a0caa8-fd6c-7879-a462-e7d7add801eb",
  type: "page-type/song",
  slug: "renee-rapp-mad",
  title: "Mad",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
