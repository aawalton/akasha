import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleIDrinkWine = {
  id: "01a0d52b-c259-7346-91a0-85b476f69a27",
  type: "page-type/song",
  slug: "adele-i-drink-wine",
  title: "I Drink Wine",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
