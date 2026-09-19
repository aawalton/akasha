import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheWexfordCarol = {
  id: "01a0b771-3ccf-7045-bf72-91665c5f000d",
  type: "page-type/song",
  slug: "celtic-woman-the-wexford-carol",
  title: "The Wexford Carol",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
