import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverOverheated = {
  id: "01a0b638-e4e7-7feb-a3f0-1023b1de3e29",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-overheated",
  ownLength: 3.567633333333333,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5uSG6fUPRaehaV820zcpsK",
      externalLink: "https://open.spotify.com/track/5uSG6fUPRaehaV820zcpsK",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "OverHeated",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "overheated|6qqNVTkY8uBg9cP3Jd7DAH|214058",
} as const satisfies Track
