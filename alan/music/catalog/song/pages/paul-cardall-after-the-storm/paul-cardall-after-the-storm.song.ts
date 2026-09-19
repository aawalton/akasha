import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAfterTheStorm = {
  id: "01a0b77d-cb3e-7364-a43b-70a85421cfbe",
  type: "page-type/song",
  slug: "paul-cardall-after-the-storm",
  title: "After The Storm",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
