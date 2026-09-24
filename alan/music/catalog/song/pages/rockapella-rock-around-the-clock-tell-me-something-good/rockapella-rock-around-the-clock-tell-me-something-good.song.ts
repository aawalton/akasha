import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaRockAroundTheClockTellMeSomethingGood = {
  id: "01a0d52b-52d9-7e75-a876-c0390127bb03",
  type: "page-type/song",
  slug: "rockapella-rock-around-the-clock-tell-me-something-good",
  title: "Rock Around the Clock / Tell Me Something Good",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
