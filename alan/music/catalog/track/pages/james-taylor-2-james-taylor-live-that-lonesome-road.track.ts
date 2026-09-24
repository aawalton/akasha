import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveThatLonesomeRoad = {
  id: "01a0abeb-3f28-74e0-8714-d2e107f3f112",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-that-lonesome-road",
  ownLength: 2.7704333333333335,
  ownProgress: 2.7704333333333335,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "That Lonesome Road",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "thatlonesomeroad|0vn7UBvSQECKJm2817Yf1P|166226",
  song: "song/james-taylor-that-lonesome-road",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 2,
      position: 15,
      externalId: "72Pnc2r7k6TA0SLzapYV2u",
      externalLink: "https://open.spotify.com/track/72Pnc2r7k6TA0SLzapYV2u",
    },
  ],
} as const satisfies Track
