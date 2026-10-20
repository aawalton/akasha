import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaLadyCroissantLiveDestinyLive = {
  id: "01a15994-8c62-77f8-bf01-6aad59ba7359",
  type: "page-type/track",
  slug: "sia-lady-croissant-live-destiny-live",
  ownLength: 3.9204333333333334,
  ownProgress: 0,
  partOfCollections: ["release/sia-lady-croissant-live"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Destiny - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/sia" }],
  trackKey: "destinylive|5WUlDfRSoLAfcVSX1WnrxN|235226",
  song: "song/sia-destiny",
  carriedBy: [
    {
      release: "release/sia-lady-croissant-live",
      discNumber: 1,
      position: 3,
      externalId: "2lBpsZk7wpsTRc6izLXpPf",
      externalLink: "https://open.spotify.com/track/2lBpsZk7wpsTRc6izLXpPf",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Track
