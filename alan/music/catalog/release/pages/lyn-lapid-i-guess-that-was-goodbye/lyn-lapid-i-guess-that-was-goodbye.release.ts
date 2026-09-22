import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidIGuessThatWasGoodbye = {
  id: "01a0676a-d721-701f-a57c-6038ea375171",
  type: "page-type/release",
  slug: "lyn-lapid-i-guess-that-was-goodbye",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2022-02-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Ta5G7cdU0U7yDjZjbvyVl",
      externalLink: "https://open.spotify.com/album/1Ta5G7cdU0U7yDjZjbvyVl",
    },
  ],
  title: "I Guess That Was Goodbye",
} as const satisfies Release
