import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulAnytime = {
  id: "01a14f45-0242-7c56-8df7-8db91749475a",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-anytime",
  ownLength: 4.096216666666667,
  ownProgress: 4.096216666666667,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  status: "completed",
  unit: "unit/minutes",
  title: "Anytime",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "anytime|3BmGtnKgCSGYIUhmivXKWX|245773",
  song: "song/kelly-clarkson-anytime",
  carriedBy: [
    {
      release: "release/kelly-clarkson-thankful",
      discNumber: 1,
      position: 10,
      externalId: "6ot0DDZVXVNB1Du2DZFwwQ",
      externalLink: "https://open.spotify.com/track/6ot0DDZVXVNB1Du2DZFwwQ",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
