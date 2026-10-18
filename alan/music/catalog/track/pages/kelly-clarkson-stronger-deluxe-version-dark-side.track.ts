import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonStrongerDeluxeVersionDarkSide = {
  id: "01a14f45-023f-7d52-972b-82e668db4110",
  type: "page-type/track",
  slug: "kelly-clarkson-stronger-deluxe-version-dark-side",
  ownLength: 3.7417666666666665,
  ownProgress: 3.7417666666666665,
  partOfCollections: ["release/kelly-clarkson-stronger-deluxe-version"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dark Side",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "darkside|3BmGtnKgCSGYIUhmivXKWX|224506",
  song: "song/kelly-clarkson-dark-side",
  carriedBy: [
    {
      release: "release/kelly-clarkson-stronger-deluxe-version",
      discNumber: 1,
      position: 3,
      externalId: "2X1Z1k5wftCspyRLrqVCza",
      externalLink: "https://open.spotify.com/track/2X1Z1k5wftCspyRLrqVCza",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
