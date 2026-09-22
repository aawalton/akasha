import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidMySunnyDayMySunnyDay = {
  id: "01a0c95e-c29d-76b7-9aa6-db037f559856",
  type: "page-type/track",
  slug: "lyn-lapid-my-sunny-day-my-sunny-day",
  ownLength: 2.1606833333333335,
  ownProgress: 0,
  partOfCollections: ["release/lyn-lapid-my-sunny-day"],
  status: "not-started",
  unit: "unit/minutes",
  title: "My Sunny Day",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "2lH1vV1rGOw0ETBmnTAyvZ", artistName: "Ted Fresco" },
    { externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" },
  ],
  trackKey: "mysunnyday|2lH1vV1rGOw0ETBmnTAyvZ,4pfy05cNNTacuOQ6SiSu4v|129641",
  song: "song/lyn-lapid-my-sunny-day",
  carriedBy: [
    {
      release: "release/lyn-lapid-my-sunny-day",
      discNumber: 1,
      position: 1,
      externalId: "42S4MmuWhMbR75RPKpIbYx",
      externalLink: "https://open.spotify.com/track/42S4MmuWhMbR75RPKpIbYx",
    },
  ],
} as const satisfies Track
