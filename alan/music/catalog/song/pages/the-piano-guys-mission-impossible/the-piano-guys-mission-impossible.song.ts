import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMissionImpossible = {
  id: "01a0b780-c535-7ae5-b381-95b928b3ad95",
  type: "page-type/song",
  slug: "the-piano-guys-mission-impossible",
  title: "Mission Impossible",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
