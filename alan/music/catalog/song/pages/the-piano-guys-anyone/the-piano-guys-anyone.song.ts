import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAnyone = {
  id: "01a0b780-0f62-7359-a5e6-fd79fc29c2f6",
  type: "page-type/song",
  slug: "the-piano-guys-anyone",
  title: "Anyone",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
