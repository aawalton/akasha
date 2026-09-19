import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheWayOut = {
  id: "01a0b77e-5fcb-742a-854f-0489e171055b",
  type: "page-type/song",
  slug: "paul-cardall-the-way-out",
  title: "The Way Out",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
