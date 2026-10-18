import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulBeautifulDisaster = {
  id: "01a14f45-0242-7a5e-b78c-233bb154a5a4",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-beautiful-disaster",
  ownLength: 4.179766666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Beautiful Disaster",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "beautifuldisaster|3BmGtnKgCSGYIUhmivXKWX|250786",
  song: "song/kelly-clarkson-beautiful-disaster",
  carriedBy: [
    {
      release: "release/kelly-clarkson-thankful",
      discNumber: 1,
      position: 7,
      externalId: "6bcnBvXEsaqFxO5jkgwPwR",
      externalLink: "https://open.spotify.com/track/6bcnBvXEsaqFxO5jkgwPwR",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
