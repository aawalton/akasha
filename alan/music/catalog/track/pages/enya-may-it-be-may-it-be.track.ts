import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaMayItBeMayItBe = {
  id: "01a14a1d-db4e-7083-86c3-8c1964881470",
  type: "page-type/track",
  slug: "enya-may-it-be-may-it-be",
  ownLength: 3.5177666666666667,
  ownProgress: 0,
  partOfCollections: ["release/enya-may-it-be"],
  status: "not-started",
  unit: "unit/minutes",
  title: "May It Be",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "mayitbe|6uothxMWeLWIhsGeF7cyo4|211066",
  song: "song/enya-may-it-be",
  carriedBy: [
    {
      release: "release/enya-may-it-be",
      discNumber: 1,
      position: 1,
      externalId: "1wIQ2Nm0raqOapHK4bCD3J",
      externalLink: "https://open.spotify.com/track/1wIQ2Nm0raqOapHK4bCD3J",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
