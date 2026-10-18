import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeHighRoad = {
  id: "01a14f45-022f-7679-981a-635fc31a22cf",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-high-road",
  ownLength: 3.3185333333333333,
  ownProgress: 3.3185333333333333,
  partOfCollections: [
    "release/kelly-clarkson-chemistry-deluxe",
    "release/kelly-clarkson-chemistry",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "high road",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "highroad|3BmGtnKgCSGYIUhmivXKWX|199112",
  song: "song/kelly-clarkson-high-road",
  carriedBy: [
    {
      release: "release/kelly-clarkson-chemistry",
      discNumber: 1,
      position: 3,
      externalId: "61JOxv4TJQ4NsGTdrbJugj",
      externalLink: "https://open.spotify.com/track/61JOxv4TJQ4NsGTdrbJugj",
    },
    {
      release: "release/kelly-clarkson-chemistry-deluxe",
      discNumber: 1,
      position: 3,
      externalId: "62gRm3NYPE6iHjSBAG4yAv",
      externalLink: "https://open.spotify.com/track/62gRm3NYPE6iHjSBAG4yAv",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
