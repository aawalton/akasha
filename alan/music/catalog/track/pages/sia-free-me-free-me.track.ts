import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaFreeMeFreeMe = {
  id: "01a15994-8c58-760a-806e-d2670fac4e46",
  type: "page-type/track",
  slug: "sia-free-me-free-me",
  ownLength: 4.767816666666667,
  ownProgress: 0,
  partOfCollections: ["release/sia-free-me"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Free Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sia" }],
  trackKey: "freeme|5WUlDfRSoLAfcVSX1WnrxN|286069",
  song: "song/sia-free-me",
  carriedBy: [
    {
      release: "release/sia-free-me",
      discNumber: 1,
      position: 1,
      externalId: "07tsxA3VTCCs35M17sBs88",
      externalLink: "https://open.spotify.com/track/07tsxA3VTCCs35M17sBs88",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Track
