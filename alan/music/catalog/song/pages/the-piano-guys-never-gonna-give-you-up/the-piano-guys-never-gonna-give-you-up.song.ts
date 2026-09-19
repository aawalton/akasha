import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysNeverGonnaGiveYouUp = {
  id: "01a0b780-dac9-7191-b2ba-9e3f3a7ba678",
  type: "page-type/song",
  slug: "the-piano-guys-never-gonna-give-you-up",
  title: "Never Gonna Give You Up",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
