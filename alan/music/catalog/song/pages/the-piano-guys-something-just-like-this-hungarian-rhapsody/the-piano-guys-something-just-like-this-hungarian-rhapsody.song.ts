import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysSomethingJustLikeThisHungarianRhapsody = {
  id: "01a0b780-53ab-7573-be34-026ee15cc5d1",
  type: "page-type/song",
  slug: "the-piano-guys-something-just-like-this-hungarian-rhapsody",
  title: "Something Just Like This / Hungarian Rhapsody",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
