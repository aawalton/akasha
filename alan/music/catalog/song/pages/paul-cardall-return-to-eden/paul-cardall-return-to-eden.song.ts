import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallReturnToEden = {
  id: "01a0b77d-c457-7511-bf0c-29fcb3e581d7",
  type: "page-type/song",
  slug: "paul-cardall-return-to-eden",
  title: "Return To Eden",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
