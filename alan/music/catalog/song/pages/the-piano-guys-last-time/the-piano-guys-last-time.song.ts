import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysLastTime = {
  id: "01a0b780-6056-74c3-aabb-02a46a1254fb",
  type: "page-type/song",
  slug: "the-piano-guys-last-time",
  title: "Last Time",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
