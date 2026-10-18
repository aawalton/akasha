import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberNotToday = {
  id: "01a14f45-023b-741f-98f9-b0cdadbeb10e",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-not-today",
  ownLength: 3.490883333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Not Today",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "nottoday|3BmGtnKgCSGYIUhmivXKWX|209453",
  song: "song/kelly-clarkson-not-today",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 17,
      externalId: "5emntevTESKC3u0SSQvcO0",
      externalLink: "https://open.spotify.com/track/5emntevTESKC3u0SSQvcO0",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
