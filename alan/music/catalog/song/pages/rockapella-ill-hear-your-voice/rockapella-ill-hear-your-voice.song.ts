import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaIllHearYourVoice = {
  id: "01a0d52b-52d8-7335-9cba-f514dc682dda",
  type: "page-type/song",
  slug: "rockapella-ill-hear-your-voice",
  title: "I'll Hear Your Voice",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
