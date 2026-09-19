import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaPixie = {
  id: "01a0b76f-d781-72ed-af75-da97ef5ac9f1",
  type: "page-type/song",
  slug: "alexandria-pixie",
  title: "Pixie",
  artist: "artist/alexandria",
  performed: true,
} as const satisfies Song
