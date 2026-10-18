import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulBeforeYourLove = {
  id: "01a14f45-0242-78c1-8d6d-b1413db221ba",
  type: "page-type/track",
  slug: "kelly-clarkson-thankful-before-your-love",
  ownLength: 3.9926666666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Before Your Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "beforeyourlove|3BmGtnKgCSGYIUhmivXKWX|239560",
  song: "song/kelly-clarkson-before-your-love",
  carriedBy: [
    {
      release: "release/kelly-clarkson-thankful",
      discNumber: 1,
      position: 12,
      externalId: "2S9GXXICP0ueChqt7ZmMZP",
      externalLink: "https://open.spotify.com/track/2S9GXXICP0ueChqt7ZmMZP",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
