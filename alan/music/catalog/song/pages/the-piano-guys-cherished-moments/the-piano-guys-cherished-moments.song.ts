import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysCherishedMoments = {
  id: "01a0b783-74e4-773d-9d52-a9b08f20f7c3",
  type: "page-type/song",
  slug: "the-piano-guys-cherished-moments",
  title: "Cherished Moments",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
