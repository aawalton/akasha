import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanGoingHome = {
  id: "01a0b771-4de9-738b-9c4e-d2c5067b8b62",
  type: "page-type/song",
  slug: "celtic-woman-going-home",
  title: "Going Home",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
