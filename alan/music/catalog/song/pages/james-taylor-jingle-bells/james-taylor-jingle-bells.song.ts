import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorJingleBells = {
  id: "01a0b779-8852-7710-ae0c-907822567691",
  type: "page-type/song",
  slug: "james-taylor-jingle-bells",
  title: "Jingle Bells",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
