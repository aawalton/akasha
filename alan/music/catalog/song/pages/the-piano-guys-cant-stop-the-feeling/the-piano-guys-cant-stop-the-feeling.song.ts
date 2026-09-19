import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysCantStopTheFeeling = {
  id: "01a0b780-ca3b-7d7f-8c44-0c002c72eb86",
  type: "page-type/song",
  slug: "the-piano-guys-cant-stop-the-feeling",
  title: "Can't Stop the Feeling",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
