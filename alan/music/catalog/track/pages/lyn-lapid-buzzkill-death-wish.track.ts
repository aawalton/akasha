import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidBuzzkillDeathWish = {
  id: "01a0c95e-b9bf-776c-91b9-bb2069927b28",
  type: "page-type/track",
  slug: "lyn-lapid-buzzkill-death-wish",
  ownLength: 2.8419833333333333,
  ownProgress: 2.8419833333333333,
  partOfCollections: ["release/lyn-lapid-buzzkill", "release/lyn-lapid-death-wish"],
  status: "completed",
  unit: "unit/minutes",
  title: "death wish",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/lyn-lapid" }],
  trackKey: "deathwish|4pfy05cNNTacuOQ6SiSu4v|170519",
  song: "song/lyn-lapid-death-wish",
  carriedBy: [
    {
      release: "release/lyn-lapid-buzzkill",
      discNumber: 1,
      position: 7,
      externalId: "2SUQxOCKTz7EzmQfEdi0xP",
      externalLink: "https://open.spotify.com/track/2SUQxOCKTz7EzmQfEdi0xP",
    },
    {
      release: "release/lyn-lapid-death-wish",
      discNumber: 1,
      position: 1,
      externalId: "0syhM7efawK9yseurhzPmN",
      externalLink: "https://open.spotify.com/track/0syhM7efawK9yseurhzPmN",
    },
  ],
} as const satisfies Track
