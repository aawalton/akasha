import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonStrongerDeluxeVersionEinstein = {
  id: "01a14f45-023f-7e6b-9ce0-61655bfcba7e",
  type: "page-type/track",
  slug: "kelly-clarkson-stronger-deluxe-version-einstein",
  ownLength: 2.9833333333333334,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-stronger-deluxe-version"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Einstein",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "einstein|3BmGtnKgCSGYIUhmivXKWX|179000",
  song: "song/kelly-clarkson-einstein",
  carriedBy: [
    {
      release: "release/kelly-clarkson-stronger-deluxe-version",
      discNumber: 1,
      position: 6,
      externalId: "40ajDLtlaz3xxdsARqW7h5",
      externalLink: "https://open.spotify.com/track/40ajDLtlaz3xxdsARqW7h5",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
