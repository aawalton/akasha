import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysOdeToJoyToTheWorld = {
  id: "01a0b780-2b6a-7440-a996-d0f28c33e5bf",
  type: "page-type/song",
  slug: "the-piano-guys-ode-to-joy-to-the-world",
  title: "Ode to Joy to the World",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
