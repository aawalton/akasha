import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaLiveFromSydneyDestiny = {
  id: "01a15994-8c63-788f-8181-f5d4ba2af0bb",
  type: "page-type/track",
  slug: "sia-live-from-sydney-destiny",
  ownLength: 4.02755,
  ownProgress: 0,
  partOfCollections: ["release/sia-live-from-sydney"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Destiny",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sia" }],
  trackKey: "destiny|5WUlDfRSoLAfcVSX1WnrxN|241653",
  song: "song/sia-destiny",
  carriedBy: [
    {
      release: "release/sia-live-from-sydney",
      discNumber: 1,
      position: 6,
      externalId: "4sEIRazDZVbRxzUSZF8OX2",
      externalLink: "https://open.spotify.com/track/4sEIRazDZVbRxzUSZF8OX2",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Track
