import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAscensusChristiAPianoRhapsody = {
  id: "01a0b77c-ff27-7e36-a94a-a5915cbc470b",
  type: "page-type/song",
  slug: "paul-cardall-ascensus-christi-a-piano-rhapsody",
  title: "Ascensus Christi: A Piano Rhapsody",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
