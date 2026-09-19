import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorThePromisedLand = {
  id: "01a0b779-8350-702f-8e5b-72cace7e9bc4",
  type: "page-type/song",
  slug: "james-taylor-the-promised-land",
  title: "The Promised Land",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
