import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysSweetChildOMine = {
  id: "01a0b780-1c7a-7ce0-a427-3764848808a0",
  type: "page-type/song",
  slug: "the-piano-guys-sweet-child-o-mine",
  title: "Sweet Child o' Mine",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
