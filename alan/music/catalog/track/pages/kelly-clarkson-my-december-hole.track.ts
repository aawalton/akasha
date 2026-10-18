import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberHole = {
  id: "01a14f45-023a-73e1-a362-dfc8516dc5ae",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-hole",
  ownLength: 3.016,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Hole",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "hole|3BmGtnKgCSGYIUhmivXKWX|180960",
  song: "song/kelly-clarkson-hole",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 3,
      externalId: "5GYuCJAQlaAUOc5SVHW1AC",
      externalLink: "https://open.spotify.com/track/5GYuCJAQlaAUOc5SVHW1AC",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
