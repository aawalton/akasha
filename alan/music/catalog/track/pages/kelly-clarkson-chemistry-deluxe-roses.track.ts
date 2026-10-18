import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeRoses = {
  id: "01a14f45-0230-7b3a-90f9-c439e8eb808c",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-roses",
  ownLength: 3.5578166666666666,
  ownProgress: 3.5578166666666666,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "roses",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "roses|3BmGtnKgCSGYIUhmivXKWX|213469",
  song: "song/kelly-clarkson-roses",
  carriedBy: [
    {
      release: "release/kelly-clarkson-chemistry-deluxe",
      discNumber: 1,
      position: 19,
      externalId: "2g46efmE9mpxnkXP7sNkdh",
      externalLink: "https://open.spotify.com/track/2g46efmE9mpxnkXP7sNkdh",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
