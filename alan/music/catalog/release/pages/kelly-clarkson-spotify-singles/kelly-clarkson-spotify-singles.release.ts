import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonSpotifySingles = {
  id: "01a0676a-d729-7080-bf67-90fa6120489c",
  type: "page-type/release",
  slug: "kelly-clarkson-spotify-singles",
  title: "Spotify Singles",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-11-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3NSkcqmYRTEb2sPICYWT1T",
      externalLink: "https://open.spotify.com/album/3NSkcqmYRTEb2sPICYWT1T",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
