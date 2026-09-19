import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMyRomance = {
  id: "01a0b779-7f2b-7e78-a148-1cb04a7e0407",
  type: "page-type/song",
  slug: "james-taylor-my-romance",
  title: "My Romance",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
