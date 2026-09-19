import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysSummerJamIntroduction = {
  id: "01a0b780-5895-7bef-8d6d-98b4661d8136",
  type: "page-type/song",
  slug: "the-piano-guys-summer-jam-introduction",
  title: "Summer Jam (Introduction)",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
