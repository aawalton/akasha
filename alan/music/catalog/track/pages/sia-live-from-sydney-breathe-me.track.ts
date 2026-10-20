import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaLiveFromSydneyBreatheMe = {
  id: "01a15994-8c63-79fc-a602-4429e1078452",
  type: "page-type/track",
  slug: "sia-live-from-sydney-breathe-me",
  ownLength: 6.105333333333333,
  ownProgress: 6.105333333333333,
  partOfCollections: ["release/sia-live-from-sydney"],
  status: "completed",
  unit: "unit/minutes",
  title: "Breathe Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sia" }],
  trackKey: "breatheme|5WUlDfRSoLAfcVSX1WnrxN|366320",
  song: "song/sia-breathe-me",
  carriedBy: [
    {
      release: "release/sia-live-from-sydney",
      discNumber: 1,
      position: 5,
      externalId: "6LuJxDGp0ASyAlSZN64bR0",
      externalLink: "https://open.spotify.com/track/6LuJxDGp0ASyAlSZN64bR0",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T14:01:17.710Z",
  progressedAt: "2026-10-20T14:01:17.710Z",
} as const satisfies Track
