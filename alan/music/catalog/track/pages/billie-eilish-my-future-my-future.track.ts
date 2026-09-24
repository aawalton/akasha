import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishMyFutureMyFuture = {
  id: "01a0b638-e9c0-78bb-9adf-39a56035027c",
  type: "page-type/track",
  slug: "billie-eilish-my-future-my-future",
  ownLength: 3.46925,
  ownProgress: 3.46925,
  partOfCollections: ["release/billie-eilish-my-future"],
  status: "completed",
  unit: "unit/minutes",
  title: "my future",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "myfuture|6qqNVTkY8uBg9cP3Jd7DAH|208155",
  song: "song/billie-eilish-my-future",
  carriedBy: [
    {
      release: "release/billie-eilish-my-future",
      discNumber: 1,
      position: 1,
      externalId: "2ygvZOXrIeVL4xZmAWJT2C",
      externalLink: "https://open.spotify.com/track/2ygvZOXrIeVL4xZmAWJT2C",
    },
  ],
} as const satisfies Track
