import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonPieceByPieceDeluxeVersionSomeone = {
  id: "01a14f45-023d-7e23-ace1-11bdb5e46ac5",
  type: "page-type/track",
  slug: "kelly-clarkson-piece-by-piece-deluxe-version-someone",
  ownLength: 3.6645333333333334,
  ownProgress: 0,
  partOfCollections: [
    "release/kelly-clarkson-piece-by-piece-deluxe-version",
    "release/kelly-clarkson-someone",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Someone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "someone|3BmGtnKgCSGYIUhmivXKWX|219872",
  song: "song/kelly-clarkson-someone",
  carriedBy: [
    {
      release: "release/kelly-clarkson-piece-by-piece-deluxe-version",
      discNumber: 1,
      position: 3,
      externalId: "70on8632PmtkPhed7jLKWN",
      externalLink: "https://open.spotify.com/track/70on8632PmtkPhed7jLKWN",
    },
    {
      release: "release/kelly-clarkson-someone",
      discNumber: 1,
      position: 1,
      externalId: "2JGV7B1EMEVVrpZaz7tUDh",
      externalLink: "https://open.spotify.com/track/2JGV7B1EMEVVrpZaz7tUDh",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
