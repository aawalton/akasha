import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOnlyTimeOnlyTime = {
  id: "01a14a1d-db4f-7a13-9722-7c1ff13815dc",
  type: "page-type/track",
  slug: "enya-only-time-only-time",
  ownLength: 3.628,
  ownProgress: 0,
  partOfCollections: ["release/enya-only-time"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Only Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "onlytime|6uothxMWeLWIhsGeF7cyo4|217680",
  song: "song/enya-only-time",
  carriedBy: [
    {
      release: "release/enya-only-time",
      discNumber: 1,
      position: 1,
      externalId: "0prw5XSbHLmKsctDEdeBuA",
      externalLink: "https://open.spotify.com/track/0prw5XSbHLmKsctDEdeBuA",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
