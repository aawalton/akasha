import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaColourTheSmallOneBrokenBiscuit = {
  id: "01a15994-8c4d-7365-915d-12d715ddd658",
  type: "page-type/track",
  slug: "sia-colour-the-small-one-broken-biscuit",
  ownLength: 4.916,
  ownProgress: 0,
  partOfCollections: ["release/sia-colour-the-small-one"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Broken Biscuit",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sia" }],
  trackKey: "brokenbiscuit|5WUlDfRSoLAfcVSX1WnrxN|294960",
  song: "song/sia-broken-biscuit",
  carriedBy: [
    {
      release: "release/sia-colour-the-small-one",
      discNumber: 1,
      position: 13,
      externalId: "62jn77jV5KLHdfRxtg18z8",
      externalLink: "https://open.spotify.com/track/62jn77jV5KLHdfRxtg18z8",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Track
