import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallGreensleevesClassicalGuitar = {
  id: "01a0b77d-3dc1-73cd-be83-98a955bb1c90",
  type: "page-type/song",
  slug: "paul-cardall-greensleeves-classical-guitar",
  title: "Greensleeves - Classical Guitar",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
