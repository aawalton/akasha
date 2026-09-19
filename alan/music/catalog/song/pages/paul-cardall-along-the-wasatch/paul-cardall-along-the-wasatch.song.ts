import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAlongTheWasatch = {
  id: "01a0b77d-b717-78e5-a457-fb147a7314d1",
  type: "page-type/song",
  slug: "paul-cardall-along-the-wasatch",
  title: "Along The Wasatch",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
