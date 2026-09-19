import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishHotline = {
  id: "01a0b771-13dc-747c-ba89-a8e8f35baf11",
  type: "page-type/song",
  slug: "billie-eilish-hotline",
  title: "hotline",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
