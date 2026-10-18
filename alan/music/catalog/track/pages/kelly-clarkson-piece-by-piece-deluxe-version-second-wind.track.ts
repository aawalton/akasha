import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonPieceByPieceDeluxeVersionSecondWind = {
  id: "01a14f45-023d-7f13-8c20-37ff8154f462",
  type: "page-type/track",
  slug: "kelly-clarkson-piece-by-piece-deluxe-version-second-wind",
  ownLength: 3.26405,
  ownProgress: 3.26405,
  partOfCollections: ["release/kelly-clarkson-piece-by-piece-deluxe-version"],
  status: "completed",
  unit: "unit/minutes",
  title: "Second Wind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "secondwind|3BmGtnKgCSGYIUhmivXKWX|195843",
  song: "song/kelly-clarkson-second-wind",
  carriedBy: [
    {
      release: "release/kelly-clarkson-piece-by-piece-deluxe-version",
      discNumber: 1,
      position: 15,
      externalId: "6mdbhv7opkIZ2gLYZ1Yn7g",
      externalLink: "https://open.spotify.com/track/6mdbhv7opkIZ2gLYZ1Yn7g",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
