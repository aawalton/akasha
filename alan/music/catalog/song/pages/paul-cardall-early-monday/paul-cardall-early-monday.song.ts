import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallEarlyMonday = {
  id: "01a0b77d-2dce-7059-87d3-15607ca42bae",
  type: "page-type/song",
  slug: "paul-cardall-early-monday",
  title: "Early Monday",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
