import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulWhatsUpLonely = {
  id: "01a14f45-0243-77e4-abb0-3dfabeb90c74",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-whats-up-lonely",
  ownLength: 4.13955,
  ownProgress: 4.13955,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  status: "completed",
  unit: "unit/minutes",
  title: "What's Up Lonely",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "whatsuplonely|3BmGtnKgCSGYIUhmivXKWX|248373",
  song: "song/kelly-clarkson-what-s-up-lonely",
  carriedBy: [
    {
      release: "release/kelly-clarkson-thankful",
      discNumber: 1,
      position: 5,
      externalId: "1ByHkumvEHingpIhElxzPf",
      externalLink: "https://open.spotify.com/track/1ByHkumvEHingpIhElxzPf",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
