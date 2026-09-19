import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const cynthiaErivoImNotThatGirl = {
  id: "01a0b7a7-0f05-7e21-87dc-2dc4dc25d735",
  type: "page-type/song",
  slug: "cynthia-erivo-im-not-that-girl",
  title: "I’m Not That Girl",
  artist: "artist/cynthia-erivo",
  performed: true,
} as const satisfies Song
