import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberJudas = {
  id: "01a14f45-023a-791c-8e4d-365dd00026be",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-judas",
  ownLength: 3.60155,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Judas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "judas|3BmGtnKgCSGYIUhmivXKWX|216093",
  song: "song/kelly-clarkson-judas",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 6,
      externalId: "5MxJfJ0ljPIXQATV0S6F5W",
      externalLink: "https://open.spotify.com/track/5MxJfJ0ljPIXQATV0S6F5W",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Track
