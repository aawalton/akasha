import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallHushLittleBabyTheMockingBirdSong = {
  id: "01a0b77d-5f11-7eab-b6ac-e7e1579c2a8a",
  type: "page-type/song",
  slug: "paul-cardall-hush-little-baby-the-mocking-bird-song",
  title: "Hush Little Baby (The Mocking Bird Song)",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
