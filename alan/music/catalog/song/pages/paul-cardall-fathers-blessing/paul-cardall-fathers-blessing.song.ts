import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFathersBlessing = {
  id: "01a0b77c-efe1-7ca9-8325-4955e2f2d447",
  type: "page-type/song",
  slug: "paul-cardall-fathers-blessing",
  title: "Father's Blessing",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
