import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSilentNightPianoAndGuitar = {
  id: "01a0b77d-4038-7704-b65e-82d5685707c6",
  type: "page-type/song",
  slug: "paul-cardall-silent-night-piano-and-guitar",
  title: "Silent Night - Piano and Guitar",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
