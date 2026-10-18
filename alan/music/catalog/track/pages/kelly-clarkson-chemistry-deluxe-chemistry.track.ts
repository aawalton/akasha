import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeChemistry = {
  id: "01a14f45-022e-7fd0-8cab-0a0c96c7342b",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-chemistry",
  ownLength: 2.5165,
  ownProgress: 2.5165,
  partOfCollections: [
    "release/kelly-clarkson-chemistry-deluxe",
    "release/kelly-clarkson-chemistry",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "chemistry",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "chemistry|3BmGtnKgCSGYIUhmivXKWX|150990",
  song: "song/kelly-clarkson-chemistry",
  carriedBy: [
    {
      release: "release/kelly-clarkson-chemistry",
      discNumber: 1,
      position: 6,
      externalId: "2g81fW0TR4ZJMAi3tMhE1a",
      externalLink: "https://open.spotify.com/track/2g81fW0TR4ZJMAi3tMhE1a",
    },
    {
      release: "release/kelly-clarkson-chemistry-deluxe",
      discNumber: 1,
      position: 6,
      externalId: "1irDAU88CxlOy98rLilTWV",
      externalLink: "https://open.spotify.com/track/1irDAU88CxlOy98rLilTWV",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
