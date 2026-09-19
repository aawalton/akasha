import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysBlessTheBrokenRoad = {
  id: "01a0b77f-fd69-75f6-8ff8-96e9ac3f8184",
  type: "page-type/song",
  slug: "the-piano-guys-bless-the-broken-road",
  title: "Bless the Broken Road",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
