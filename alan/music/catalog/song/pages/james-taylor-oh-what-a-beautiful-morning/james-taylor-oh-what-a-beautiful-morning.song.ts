import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOhWhatABeautifulMorning = {
  id: "01a0b779-7488-7fb0-a760-e874549122bf",
  type: "page-type/song",
  slug: "james-taylor-oh-what-a-beautiful-morning",
  title: "Oh, What a Beautiful Morning",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
