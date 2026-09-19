import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaTheJesterAndTheQueen = {
  id: "01a0b76f-d9f2-754b-ac2e-135f138677a2",
  type: "page-type/song",
  slug: "alexandria-the-jester-and-the-queen",
  title: "The Jester and The Queen",
  artist: "artist/alexandria",
  performed: true,
} as const satisfies Song
