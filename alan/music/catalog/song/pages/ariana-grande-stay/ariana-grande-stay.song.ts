import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeStay = {
  id: "01a0b76f-f363-7bdb-ac02-ac5eca9c4751",
  type: "page-type/song",
  slug: "ariana-grande-stay",
  title: "stay",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
