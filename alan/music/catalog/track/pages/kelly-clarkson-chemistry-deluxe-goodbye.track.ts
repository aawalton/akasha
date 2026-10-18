import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeGoodbye = {
  id: "01a14f45-022f-7a66-9815-28dadcc4a083",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-goodbye",
  ownLength: 3.2832,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  status: "not-started",
  unit: "unit/minutes",
  title: "goodbye",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "goodbye|3BmGtnKgCSGYIUhmivXKWX|196992",
  song: "song/kelly-clarkson-goodbye",
  carriedBy: [
    {
      release: "release/kelly-clarkson-chemistry-deluxe",
      discNumber: 1,
      position: 18,
      externalId: "4doWwLlmUEinCUlJHSWQhh",
      externalLink: "https://open.spotify.com/track/4doWwLlmUEinCUlJHSWQhh",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
