import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulMissIndependent = {
  id: "01a14f45-0243-7edd-9e60-3a967e256885",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-miss-independent",
  ownLength: 3.5797666666666665,
  ownProgress: 3.5797666666666665,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  status: "completed",
  unit: "unit/minutes",
  title: "Miss Independent",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "missindependent|3BmGtnKgCSGYIUhmivXKWX|214786",
  song: "song/kelly-clarkson-miss-independent",
  carriedBy: [
    {
      release: "release/kelly-clarkson-thankful",
      discNumber: 1,
      position: 2,
      externalId: "2CZi8d774dBB0wiuWMIpr8",
      externalLink: "https://open.spotify.com/track/2CZi8d774dBB0wiuWMIpr8",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
