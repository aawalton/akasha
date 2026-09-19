import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysUnchainedMelody = {
  id: "01a0b780-1e1f-7ee1-953f-be2efa2b865c",
  type: "page-type/song",
  slug: "the-piano-guys-unchained-melody",
  title: "Unchained Melody",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
