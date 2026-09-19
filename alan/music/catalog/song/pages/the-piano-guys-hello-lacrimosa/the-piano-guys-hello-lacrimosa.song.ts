import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysHelloLacrimosa = {
  id: "01a0b780-7e0d-7b79-b955-a4ae65b513be",
  type: "page-type/song",
  slug: "the-piano-guys-hello-lacrimosa",
  title: "Hello / Lacrimosa",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
