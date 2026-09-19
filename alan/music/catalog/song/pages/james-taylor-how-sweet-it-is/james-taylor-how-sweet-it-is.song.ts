import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHowSweetItIs = {
  id: "01a0b779-7218-776a-9325-ae2c28c2c484",
  type: "page-type/song",
  slug: "james-taylor-how-sweet-it-is",
  title: "How Sweet It Is",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
