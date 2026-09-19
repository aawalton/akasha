import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanPieJesu = {
  id: "01a0b779-41a6-7801-b9d5-aeff5b2161c4",
  type: "page-type/song",
  slug: "celtic-woman-pie-jesu",
  title: "Pie Jesu",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
