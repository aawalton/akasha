import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kpopDemonHuntersCastStrategy = {
  id: "01a0c958-57d0-7035-81ab-5f43455444d4",
  type: "page-type/song",
  slug: "kpop-demon-hunters-cast-strategy",
  title: "Strategy",
  artist: "artist/kpop-demon-hunters-cast",
  performed: true,
} as const satisfies Song
