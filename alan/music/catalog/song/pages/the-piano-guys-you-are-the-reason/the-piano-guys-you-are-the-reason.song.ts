import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysYouAreTheReason = {
  id: "01a0b780-2124-71db-9b04-5e871c9d6985",
  type: "page-type/song",
  slug: "the-piano-guys-you-are-the-reason",
  title: "You Are The Reason",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
