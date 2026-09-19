import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaLust = {
  id: "01a0b76f-d64f-743f-9e27-9986ed20b47e",
  type: "page-type/song",
  slug: "alexandria-lust",
  title: "Lust",
  artist: "artist/alexandria",
  performed: true,
} as const satisfies Song
