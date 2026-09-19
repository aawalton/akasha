import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaKnightOfSwords = {
  id: "01a0b76f-d528-7dfb-b97b-7f267d47d21f",
  type: "page-type/song",
  slug: "alexandria-knight-of-swords",
  title: "Knight of Swords",
  artist: "artist/alexandria",
  performed: true,
} as const satisfies Song
