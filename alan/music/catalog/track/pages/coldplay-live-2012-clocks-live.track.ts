import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012ClocksLive = {
  id: "01a0b9ee-db6a-7e2a-97fa-201df8161040",
  type: "page-type/track",
  slug: "coldplay-live-2012-clocks-live",
  ownLength: 4.749333333333333,
  ownProgress: 4.749333333333333,
  partOfCollections: ["release/coldplay-live-2012"],
  status: "completed",
  unit: "unit/minutes",
  title: "Clocks - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "clockslive|4gzpq5DPGxSnKTe4SA8HAU|284960",
  song: "song/coldplay-clocks",
  carriedBy: [
    {
      release: "release/coldplay-live-2012",
      discNumber: 1,
      position: 13,
      externalId: "7LIQNY8P7ZGxilKVX88MF1",
      externalLink: "https://open.spotify.com/track/7LIQNY8P7ZGxilKVX88MF1",
    },
  ],
  createdAt: "2026-09-19T13:50:33.834Z",
  updatedAt: "2026-09-24T19:59:17.000Z",
} as const satisfies Track
