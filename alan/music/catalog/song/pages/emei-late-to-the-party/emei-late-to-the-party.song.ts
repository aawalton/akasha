import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiLateToTheParty = {
  id: "01a0c43e-7c08-76d5-ba84-3484c2eb6ab4",
  type: "page-type/song",
  slug: "emei-late-to-the-party",
  title: "Late to the Party",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
