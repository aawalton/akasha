import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWexfordCarol = {
  id: "01a0b779-2667-7c57-accc-713908a50d6d",
  type: "page-type/song",
  slug: "celtic-woman-wexford-carol",
  title: "Wexford Carol",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
