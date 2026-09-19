import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallRedButtes = {
  id: "01a0b77c-f769-7dac-bd49-855854d334a6",
  type: "page-type/song",
  slug: "paul-cardall-red-buttes",
  title: "Red Buttes",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
