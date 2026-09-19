import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSnowtime = {
  id: "01a0b779-5b0a-7980-95ae-bb2e1b59bb75",
  type: "page-type/song",
  slug: "james-taylor-snowtime",
  title: "SnowTime",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
