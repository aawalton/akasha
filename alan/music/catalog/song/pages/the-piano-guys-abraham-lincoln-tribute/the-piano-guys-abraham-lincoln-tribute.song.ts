import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAbrahamLincolnTribute = {
  id: "01a0b780-14e6-7efd-9471-2bdafd7fb95e",
  type: "page-type/song",
  slug: "the-piano-guys-abraham-lincoln-tribute",
  title: "Abraham Lincoln Tribute",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
