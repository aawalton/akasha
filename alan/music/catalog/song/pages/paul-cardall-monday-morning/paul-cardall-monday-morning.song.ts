import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallMondayMorning = {
  id: "01a0b77d-bccc-762f-abe8-c36d9b66277e",
  type: "page-type/song",
  slug: "paul-cardall-monday-morning",
  title: "Monday Morning",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
