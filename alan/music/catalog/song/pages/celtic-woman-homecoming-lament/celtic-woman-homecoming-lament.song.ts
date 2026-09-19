import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanHomecomingLament = {
  id: "01a0b771-aa53-7219-afa6-39725c9eaa70",
  type: "page-type/song",
  slug: "celtic-woman-homecoming-lament",
  title: "Homecoming Lament",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
