import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFirstBreath = {
  id: "01a0b77d-192e-75ec-8cd3-88d42a66fc20",
  type: "page-type/song",
  slug: "paul-cardall-first-breath",
  title: "First Breath",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
