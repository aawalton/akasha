import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanATimeForUs = {
  id: "01a0b779-4de7-7e1d-ad26-0ab227bae700",
  type: "page-type/song",
  slug: "celtic-woman-a-time-for-us",
  title: "A Time For Us",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
