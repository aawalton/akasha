import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWeCouldBeKind = {
  id: "01a0b77e-ba62-748a-a627-30afb1152395",
  type: "page-type/song",
  slug: "paul-cardall-we-could-be-kind",
  title: "We Could Be Kind",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
