import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysHarmoniousBlacksmith = {
  id: "01a0b780-68ce-7b27-bfd0-f09f3010ec41",
  type: "page-type/song",
  slug: "the-piano-guys-harmonious-blacksmith",
  title: "Harmonious Blacksmith",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
