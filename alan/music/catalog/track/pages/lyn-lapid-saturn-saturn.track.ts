import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidSaturnSaturn = {
  id: "01a0c95e-bde9-73b2-90ed-d154b2b54981",
  type: "page-type/track",
  slug: "lyn-lapid-saturn-saturn",
  ownLength: 3.5611,
  ownProgress: 3.5611,
  partOfCollections: ["release/lyn-lapid-saturn"],
  status: "completed",
  unit: "unit/minutes",
  title: "Saturn",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/lyn-lapid" }],
  trackKey: "saturn|4pfy05cNNTacuOQ6SiSu4v|213666",
  song: "song/lyn-lapid-saturn",
  carriedBy: [
    {
      release: "release/lyn-lapid-saturn",
      discNumber: 1,
      position: 1,
      externalId: "3F3YMGCp5ErvS14f71s8LX",
      externalLink: "https://open.spotify.com/track/3F3YMGCp5ErvS14f71s8LX",
    },
  ],
} as const satisfies Track
