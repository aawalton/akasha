import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanDeckTheHalls = {
  id: "01a0b779-4777-7e56-8979-6b2a3e2739fe",
  type: "page-type/song",
  slug: "celtic-woman-deck-the-halls",
  title: "Deck The Halls",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
