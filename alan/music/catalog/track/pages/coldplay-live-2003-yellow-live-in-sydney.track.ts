import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2003YellowLiveInSydney = {
  id: "01a0b9ee-e6fe-7584-a58d-ba66d295756b",
  type: "page-type/track",
  slug: "coldplay-live-2003-yellow-live-in-sydney",
  ownLength: 5.6111,
  ownProgress: 5.6111,
  partOfCollections: ["release/coldplay-live-2003"],
  status: "completed",
  unit: "unit/minutes",
  title: "Yellow - Live in Sydney",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "yellowliveinsydney|4gzpq5DPGxSnKTe4SA8HAU|336666",
  song: "song/coldplay-yellow",
  carriedBy: [
    {
      release: "release/coldplay-live-2003",
      discNumber: 1,
      position: 9,
      externalId: "6cR5WracqJzYoH80lSKW0L",
      externalLink: "https://open.spotify.com/track/6cR5WracqJzYoH80lSKW0L",
    },
  ],
} as const satisfies Track
