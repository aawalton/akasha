import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulLow = {
  id: "01a14f45-0243-7558-89c4-71a341aa65dd",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-low",
  ownLength: 3.477333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Low",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "low|3BmGtnKgCSGYIUhmivXKWX|208640",
  song: "song/kelly-clarkson-low",
  carriedBy: [
    {
      release: "release/kelly-clarkson-thankful",
      discNumber: 1,
      position: 3,
      externalId: "7HtE5z6XsuogcQJmnTNAIH",
      externalLink: "https://open.spotify.com/track/7HtE5z6XsuogcQJmnTNAIH",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
