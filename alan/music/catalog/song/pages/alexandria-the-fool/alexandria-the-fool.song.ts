import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaTheFool = {
  id: "01a0b76f-d8b6-73b2-8259-5216dd389bc4",
  type: "page-type/song",
  slug: "alexandria-the-fool",
  title: "The Fool",
  artist: "artist/alexandria",
  performed: true,
} as const satisfies Song
