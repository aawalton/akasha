import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonPieceByPieceDeluxeVersionInvincible = {
  id: "01a14f45-023d-79ce-8152-38a5bacdf2bf",
  type: "page-type/track",
  slug: "kelly-clarkson-piece-by-piece-deluxe-version-invincible",
  ownLength: 3.97265,
  ownProgress: 3.97265,
  partOfCollections: [
    "release/kelly-clarkson-piece-by-piece-deluxe-version",
    "release/kelly-clarkson-invincible",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Invincible",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "invincible|3BmGtnKgCSGYIUhmivXKWX|238359",
  song: "song/sia-invincible",
  carriedBy: [
    {
      release: "release/kelly-clarkson-invincible",
      discNumber: 1,
      position: 1,
      externalId: "7cOi1w3MoljmLhoTDMDkC9",
      externalLink: "https://open.spotify.com/track/7cOi1w3MoljmLhoTDMDkC9",
    },
    {
      release: "release/kelly-clarkson-piece-by-piece-deluxe-version",
      discNumber: 1,
      position: 2,
      externalId: "7mZVWemhwUnhr2q6GYl6T7",
      externalLink: "https://open.spotify.com/track/7mZVWemhwUnhr2q6GYl6T7",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
