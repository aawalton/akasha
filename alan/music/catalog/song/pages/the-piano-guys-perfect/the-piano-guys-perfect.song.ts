import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysPerfect = {
  id: "01a0b780-04a2-70fb-bc3f-0e019ee64e5f",
  type: "page-type/song",
  slug: "the-piano-guys-perfect",
  title: "Perfect",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
