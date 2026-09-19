import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishMyFutureMyFuture = {
  id: "01a0b638-e9c0-78bb-9adf-39a56035027c",
  type: "page-type/track",
  slug: "billie-eilish-my-future-my-future",
  ownLength: 3.46925,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-my-future"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ygvZOXrIeVL4xZmAWJT2C",
      externalLink: "https://open.spotify.com/track/2ygvZOXrIeVL4xZmAWJT2C",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "my future",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "myfuture|6qqNVTkY8uBg9cP3Jd7DAH|208155",
  song: "song/billie-eilish-my-future",
} as const satisfies Track
