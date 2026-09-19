import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveThatLonesomeRoad = {
  id: "01a0abeb-3f28-74e0-8714-d2e107f3f112",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-that-lonesome-road",
  ownLength: 2.7704333333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "72Pnc2r7k6TA0SLzapYV2u",
      externalLink: "https://open.spotify.com/track/72Pnc2r7k6TA0SLzapYV2u",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "That Lonesome Road",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "thatlonesomeroad|0vn7UBvSQECKJm2817Yf1P|166226",
  song: "song/james-taylor-that-lonesome-road",
} as const satisfies Track
