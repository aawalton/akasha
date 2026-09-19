import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysFollowYou = {
  id: "01a0b780-3db2-784e-8c02-839c93d29e69",
  type: "page-type/song",
  slug: "the-piano-guys-follow-you",
  title: "Follow You",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
