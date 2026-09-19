import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAChangeInTheAir = {
  id: "01a0b780-3232-7f73-bd28-207d641e9f63",
  type: "page-type/song",
  slug: "the-piano-guys-a-change-in-the-air",
  title: "A Change In The Air",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
