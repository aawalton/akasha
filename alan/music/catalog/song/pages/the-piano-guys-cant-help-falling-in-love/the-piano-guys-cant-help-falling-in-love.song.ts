import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysCantHelpFallingInLove = {
  id: "01a0b780-ab33-7399-9bea-4152a1cc8b2f",
  type: "page-type/song",
  slug: "the-piano-guys-cant-help-falling-in-love",
  title: "Can't Help Falling in Love",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
