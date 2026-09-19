import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanMarbleHalls = {
  id: "01a0b779-387d-7c78-a258-7635e3a1d927",
  type: "page-type/song",
  slug: "celtic-woman-marble-halls",
  title: "Marble Halls",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
