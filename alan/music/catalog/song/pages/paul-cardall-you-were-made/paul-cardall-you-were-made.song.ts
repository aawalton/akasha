import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallYouWereMade = {
  id: "01a0b77d-2910-74fe-9325-76a7b1c8fb48",
  type: "page-type/song",
  slug: "paul-cardall-you-were-made",
  title: "You Were Made",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
