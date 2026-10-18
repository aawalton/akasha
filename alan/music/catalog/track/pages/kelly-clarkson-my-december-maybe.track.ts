import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberMaybe = {
  id: "01a14f45-023a-71bb-be17-8d6e75126006",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-maybe",
  ownLength: 4.375333333333334,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Maybe",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "maybe|3BmGtnKgCSGYIUhmivXKWX|262520",
  song: "song/kelly-clarkson-maybe",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 9,
      externalId: "0VH8cpnwWzUVclNrZv8V6f",
      externalLink: "https://open.spotify.com/track/0VH8cpnwWzUVclNrZv8V6f",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
