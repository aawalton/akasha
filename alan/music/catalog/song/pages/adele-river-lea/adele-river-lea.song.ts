import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleRiverLea = {
  id: "01a0d52b-c259-783c-acc0-173e433af055",
  type: "page-type/song",
  slug: "adele-river-lea",
  title: "River Lea",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
