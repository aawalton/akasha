import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyWhosDad = {
  id: "01a0b77f-bf80-7362-b020-c7284bf780fb",
  type: "page-type/song",
  slug: "the-holderness-family-whos-dad",
  title: "Who's Dad?",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
