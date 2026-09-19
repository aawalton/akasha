import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWalkBesideMe = {
  id: "01a0b771-968d-7fd4-bc0a-bf1a06f02e0f",
  type: "page-type/song",
  slug: "celtic-woman-walk-beside-me",
  title: "Walk Beside Me",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
