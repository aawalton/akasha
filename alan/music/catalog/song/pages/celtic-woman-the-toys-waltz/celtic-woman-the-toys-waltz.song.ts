import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheToysWaltz = {
  id: "01a0b771-757f-722c-ade7-91af432c2de5",
  type: "page-type/song",
  slug: "celtic-woman-the-toys-waltz",
  title: "The Toys’ Waltz",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
